import React, { useEffect, useState, useContext } from "react";  
import Title from "../components/Title";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";

function Cart() {
  const { navigate, products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  // ✅ useEffect ka dependency sahi kiya
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size: size,
            });
          }
        }
      }
      setCartData(tempData); // ✅ idhar call karo, dependency array me mat dalo
    }
  }, [cartItems, products]);

  // increment fn
  const increment = (id, size) => {
    const currentQuantity = cartItems[id][size];
    updateQuantity(id, size, currentQuantity + 1);
  };

  // decrement fn
  const decrement = (id, size) => {
    const currentQuantity = cartItems[id][size];
    if (currentQuantity > 1) {
      updateQuantity(id, size, currentQuantity - 1);
    }
  };

  return products.length > 0 && cartItems ? (
    <div className="max-padd-container py-16 pt-28 bg-primary">
      <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
        {/* Left Side */}
        <div className="flex flex-2 flex-col gap-3 text-[95%]">
          <Title title1={"Cart"} title2={"Overview"} titleStyles={"pb-5"} />
          <div className="grid grid-cols-[6fr_1fr_1fr] text-base font-medium bg-white p-2">
            <h5 className="h5 text-left">Product Details</h5>
            <h5 className="h5 text-center">Subtotal</h5>
            <h5 className="h5 text-center">Action</h5>
          </div>

          {cartData.map((item, i) => {
            // ✅ yahan galti thi: (products) => product._id === item._id
            const product = products.find((p) => p._id === item._id);

            if (!product) return null; // safety check

            const quantity = cartItems[item._id][item.size];
           
            return (
              <div
                key={i}
                className="grid grid-cols-[6fr_1fr_1fr] text-base font-medium bg-white p-2"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="flex bg-primary">
                    <img
                      src={product.image[0]}
                      alt="product"
                      className="w-20"
                    />
                    <div>
                      <h5 className="hidden sm:block h5 line-clamp-1">
                        {product.name}
                      </h5>
                      <div className="bold-14 flexStart gap-2 mb-1">
                        Size: <p>{item.size}</p>
                      </div>
                      <div className="flexBetween">
                        <div className="flex items-center ring-1 ring-slate-900/50 rounded-full overflow-hidden bg-primary">
                          <button
                            onClick={() => decrement(item._id, item.size)}   // ✅ galat tha (cartItems.size)
                            className="p-1.5 bg-white text-secondary rounded-full shadow-md"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <p className="px-2">{quantity}</p>
                          <button
                            onClick={() => increment(item._id, item.size)}   // ✅ galat tha
                            className="p-1.5 bg-white text-secondary rounded-full shadow-md"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>
                    {currency}
                    {product.offerPrice * quantity}
                  </p>
                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  >
                    <IoCloseCircleOutline className="text-xl" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex-1 flex-col">
          <div className="max-w-[360px] w-full bg-white p-5 py-10 max-md:mt-16">
            <CartTotal />
            <button onClick={()=>navigate('/placeOrder')} className="btn-dark w-full mt-8"> Procees to Deliver</button>
          </div>
        </div>
      </div>
    </div>
  
  ) : (
    <p className="text-center py-20">Your cart is empty</p>   // ✅ null ki jagah
  );
}

export default Cart;
