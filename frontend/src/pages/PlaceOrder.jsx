import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PlaceOrder() {
  const { navigate, cartItems, setCartItems, products, axios } =
    useContext(ShopContext);

  const [method, setMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // build order items
      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === itemId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      // format items for backend
      let items = orderItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        size: item.size,
      }));

      if (method === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          items,
          address: formData,
        });
      if(data.success){
        toast.success(data.message)
        setCartItems({})
        navigate("my-orders")
      }else{
         toast.error(data.message)
      }
      } else {
        const { data } = await axios.post("/api/order/stripe", {
          items,
          address: formData,
        });
        console.log(data, "stripe data console")
        if (data.success) {
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: data.data.id });
             setCartItems({})
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } 
  };

  const inputClass =
    "ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none text-sm w-full";

  return (
    <div className="max-padd-container py-16 pt-28 bg-primary">
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
          {/* Left Side */}
          <div className="flex flex-[2] flex-col gap-3 text-[95%]">
            <Title
              title1="Delivery"
              title2="Information"
              title1Styles="pb-5"
            />

            <div className="flex gap-3">
              <input
                onChange={onChangeHandler}
                value={formData.firstName}
                type="text"
                name="firstName"
                placeholder="First Name"
                className={inputClass}
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.lastName}
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={inputClass}
                required
              />
            </div>

            <input
              onChange={onChangeHandler}
              value={formData.email}
              type="email"
              name="email"
              placeholder="Email"
              className={inputClass}
              required
            />
            <input
              onChange={onChangeHandler}
              value={formData.phone}
              type="text"
              name="phone"
              placeholder="Phone"
              className={inputClass}
              required
            />
            <input
              onChange={onChangeHandler}
              value={formData.street}
              type="text"
              name="street"
              placeholder="Street"
              className={inputClass}
              required
            />

            <div className="flex gap-3">
              <input
                onChange={onChangeHandler}
                value={formData.city}
                type="text"
                name="city"
                placeholder="City"
                className={inputClass}
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.state}
                type="text"
                name="state"
                placeholder="State"
                className={inputClass}
                required
              />
            </div>

            <div className="flex gap-3">
              <input
                onChange={onChangeHandler}
                value={formData.zipcode}
                type="text"
                name="zipcode"
                placeholder="Zipcode"
                className={inputClass}
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.country}
                type="text"
                name="country"
                placeholder="Country"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-1 flex-col">
            <div className="max-w-[360px] w-full bg-white p-5 py-10 max-md:mt-16">
              <CartTotal method={method} setMethod={setMethod} />
              <button
                type="submit"
                disabled={loading}
                className={`btn-dark w-full mt-8 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Processing..." : "Proceed to Order"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;
