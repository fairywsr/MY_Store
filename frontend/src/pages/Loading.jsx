import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext"; // ✅ fix import
import { useLocation } from "react-router-dom";

function Loading() {
  const { navigate } = useContext(ShopContext); // ✅ uppercase context
  let { search } = useLocation();

  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");   // e.g. my-orders
  const orderId = query.get("orderId"); // e.g. 68b9cf8e...

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        if (orderId) {
          navigate(`/${nextUrl}?orderId=${orderId}`);
        } else {
          navigate(`/${nextUrl}`);
        }
      }, 5000);
    }
  }, [nextUrl, orderId, navigate]);

  return (
    <div className="flexCenter h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-secondary" />
    </div>
  );
}

export default Loading;
