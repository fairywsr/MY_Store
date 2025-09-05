import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

function MyOrders() {
  const { currency, user, axios } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const loadOrdersData = async () => {
    if (!user) return;
    try {
      const { data } = await axios.post("/api/order/userorders");
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrdersData();
  }, []);

  return (
    <div className="max-padd-container py-16 pt-28 bg-primary min-h-screen">
      <Title title1={"My Orders"} title2={"List"} titleStyles={"pb-10"} />

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md p-5 transition hover:shadow-lg"
          >
            {/* Items */}
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row gap-4 border-b border-gray-200 pb-4 last:border-none"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flexCenter bg-gray-100 rounded-lg w-20 h-20">
                      <img
                        src={item.product?.image[0]}
                        alt="order"
                        className="max-h-16 object-contain"
                      />
                    </div>
                    <div>
                      <h5 className="font-semibold capitalize line-clamp-1">
                        {item.product?.name}
                      </h5>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mt-1 text-gray-600">
                        <p>
                          <span className="font-medium">Price:</span> {currency}
                          {item.product?.offerPrice}
                        </p>
                        <p>
                          <span className="font-medium">Qty:</span>{" "}
                          {item.quantity}
                        </p>
                        <p>
                          <span className="font-medium">Size:</span> {item.size}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">OrderId:</span>{" "}
                  <span className="text-gray-400 break-all">{order._id}</span>
                </p>
                <p>
                  <span className="font-medium">Method:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.createdAt).toDateString()}
                </p>
                <p>
                  <span className="font-medium">Amount:</span> {currency}
                  {order.amount}
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <h4 className="font-medium text-sm">Status:</h4>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  <p className="capitalize text-sm">{order.status}</p>
                </div>
                <button
                  onClick={loadOrdersData}
                  className="px-3 py-1 text-xs rounded-md border border-secondary text-secondary hover:bg-secondary hover:text-white transition"
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
