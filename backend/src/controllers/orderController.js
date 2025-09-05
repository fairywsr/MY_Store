import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from "stripe";
const placeOrderCOD = asyncHandler(async (req, res) => {
  const { items, address } = req.body;
  const userId = req.user._id;

  if (!items || items.length === 0) {
    throw new ApiError(400, "Please add product first");
  }

  // ✅ calculate subtotal correctly
  let subTotal = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) throw new ApiError(404, "Product not found");
    subTotal += product.offerPrice * item.quantity;
  }

  // ✅ calculate totals
  const deliveryCharges = 10;
  const taxPercentage = 0.02; // 2%
  const taxAmount = subTotal * taxPercentage;
  const totalAmount = subTotal + taxAmount + deliveryCharges;

  // ✅ create order
  const order = await Order.create({
    userId,
    items,
    amount: totalAmount,
    address,
    paymentMethod: "COD",
  });

  // ✅ clear cart
  await User.findByIdAndUpdate(userId, { cartData: {} });

  return res.json(new ApiResponse(200, order, "Order placed successfully"));
});

const placeOrderStripe = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ inside controller

  const { items, address } = req.body;
  const userId = req.user._id;
  const { origin } = req.headers; // ✅ use origin from headers
  const clientURL = origin || process.env.CLIENT_URL || "http://localhost:5173";

  console.log("🔹 Origin Header:", origin);
  console.log("🔹 Client URL:", clientURL);

  if (!items || items.length === 0) {
    throw new ApiError(400, "Please add product first");
  }

  let productData = [];
  let subTotal = 0;

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) throw new ApiError(404, "Product not found");

    productData.push({
      name: product.name,
      price: product.offerPrice,
      quantity: item.quantity,
    });

    subTotal += product.offerPrice * item.quantity;
  }

  // Calculate totals
  const deliveryCharges = 10;
  const taxPercentage = 0.02;
  const taxAmount = subTotal * taxPercentage;
  const totalAmount = subTotal + taxAmount + deliveryCharges;

  // ✅ Create order first (order._id needed for URL)
  const order = await Order.create({
    userId,
    items,
    amount: totalAmount,
    address,
    paymentMethod: "stripe",
    status: "Pending",
  });

  const successUrl = `${clientURL}/loader?next=my-orders`;
  const cancelUrl = `${clientURL}/order-failed?orderId=${order._id}`;

  console.log("✅ Success URL:", successUrl);
  console.log("✅ Cancel URL:", cancelUrl);

  // Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: productData.map((item) => ({
      price_data: {
        currency: "usd", // ⚠️ or "pkr" if supported
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

return res.status(201).json(
  new ApiResponse(
    201,
    { id: session.id }, // ✅ only send session id
    "Stripe session created"
  )
);
});

//  stripe webhooks fro verifying payments through stripe
const stripeWebhooks = asyncHandler(async(req, res)=>{
  const stripeIntance = new Stripe(process.env.STRIPE_SECRET_KEY)

  const signature = requestAnimationFrame.headers["stripe-signature"]

  let event 

  try {
    event = stripeIntance.webhooks.constructEvent(req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    res.status(400).send(`webHook Error: ${error.message}`)
  }

  // handle the event 
  switch (event.type){
    case "payment_intent.succeeded":{
      const paymentIntent = event.data.object
      const paymentIntentId = paymentIntent.id

      // getting session metaData 
      const session = await stripeIntance.checkout.sessions.list({
        payment_intent: paymentIntentId
      })

      const {orderId, userId} = session.data[0].metadata
      // mark order as paid
      await Order.findByIdAndUpdate(orderId, {isPaid: true})

      await User.findByIdAndUpdate(userId, {cartData: {}})
      break;
    }
    case "payment_intent.payment_failed":{
      const paymentIntent = event.data.object
      const paymentIntentId = paymentIntent.id

      // getting session metaData 
      const session = await stripeIntance.checkout.sessions.list({
        payment_intent: paymentIntentId
      })

       const {orderId} = session.data[0].metadata
      // mark order as paid
      await Order.findByIdAndDelete(orderId)
    }
    default: 
    console.error(`unHandled event type ${event.type}`)
    break;
  }
  res.json({received: true})
})

const userOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // find orders for this user
  const orders = await Order.find({
    userId: userId,
    $or: [{ paymentMethod: "COD" }, { isPaid: true }],
  })
    .populate("items.product")
    .sort({ createdAt: -1 });

  if (!orders || orders.length === 0) {
    throw new ApiError(406, "No orders found");
  }

  // attach amount for each order
  const formattedOrders = orders.map(order => {
    const amount = order.items.reduce((sum, item) => {
      return sum + (item.product.offerPrice * item.quantity);
    }, 0);

    return { ...order.toObject(), amount };
  });

  return res
    .status(200)
    .json(new ApiResponse(200, formattedOrders, "Orders fetched successfully"));
});

const allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    $or: [{ paymentMethod: "COD" }, { isPaid: true }],
  })
    .populate("items.product")
    .sort({ createdAt: -1 });

  if (!orders || orders.length === 0) {
    throw new ApiError(404, "Orders not found");
  }

  // Add amount to each order
  const formattedOrders = orders.map(order => {
    const amount = order.items.reduce((sum, item) => {
      return sum + (item.product.offerPrice * item.quantity);
    }, 0);

    return { ...order.toObject(), amount };
  });

  // Calculate total amount of all orders
  const totalAmount = formattedOrders.reduce((sum, order) => {
    return sum + order.amount;
  }, 0);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        orders: formattedOrders,
        totalAmount, // ✅ overall total
      },
      "All orders fetched successfully"
    )
  );
});

const orderStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    throw new ApiError(400, "Order ID and status are required");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true, runValidators: true }
  );

  if (!updatedOrder) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedOrder, "Order status updated"));
});

export { placeOrderCOD, placeOrderStripe, userOrders, allOrders, orderStatus, stripeWebhooks };
