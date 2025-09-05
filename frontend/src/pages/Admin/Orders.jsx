import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import toast from "react-hot-toast";


function Orders() {
  const { currency, axios } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    
     try {
      const { data } = await axios.post("/api/order/list");
   
      if (data.success) {      
        setOrders(data.data.orders); 
        toast.message(data.message)
         
      }
    } catch (error) {
      console.log(error);
    } 
  
  };

const statusHandler = async(event, orderId)=>{
  try {
    const {data} = await axios.post("/api/order/status", {orderId, status:event.target.value})
    if(data.success){
      await fetchAllOrders()
      toast.success(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="px-2 sm:px-6 py-12 m-2 h-[97vh] bg-primary overflow-y-scroll lg:w-4/5 rounded-xl">
      {orders.map((order) => {
        return (<div key={order._id} className="bg-white p-3 mb-4 rounded">
          {order.items.map((item, idx) => {
             return (<div key={idx} className="text-gray-700 flex flex-col lg:flex-row gap-4 mb-3">
              <div className="flex flex-[2] gap-x-3">
                <div className="flexCenter bg-primary rounded">
                  <img
                    src={item.image?.[0]}
                    alt="ordered product image"
                    className="max-h-20 max-w-20 object-contain"
                  />
                </div>
                <div className="block w-full">
                  <h5 className="h5 capitalize line-clamp-1">{item.name}</h5>
                  <div className="flex flex-wrap gap-3 max-sm:gap-y-1 mt-1">
                    <div className="flex items-center gap-x-2">
                      <h5 className="medium-14">Price:</h5>
                      <p>
                        {currency}
                        {item.offerPrice}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <h5 className="medium-14">Quantity:</h5>
                      <p>{item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <h5 className="medium-14">Size</h5>
                      <p>{item.size}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
          })}
          {/* order Summary */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 border-t border-gray-300 pt-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-x-2">
                <h5 className="medium-14">OrderID:</h5>
                <p className="text-xs break-all">{order._id}</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-x-2">
                  <h5 className="medium-14">Customer:</h5>
                  <p className="text-xs">
                    {order.address.firstName}
                    {order.address.lastName}
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <h5 className="medium-14">Phone:</h5>
                  <p className="text-xs">{order.address.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <h5 className="medium-14">Address:</h5>
                <p className="text-xs break-all p-1">
                  {order.address.street}
                  {order.address.city}
                  {order.address.state}
                  {order.address.country}
                  {order.address.zipcode}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-x-2">
                  <h5 className="medium-14">Payment Status:</h5>
                  <p className="text-xs">{order.isPaid ? "Done" : "Pending"}</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <h5 className="medium-14">Method:</h5>
                  <p className="text-xs">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-x-2">
                <h5 className="medium-14">Date:</h5>
                <p className="text-xs">
                  {new Date(order.createdAt).toDateString()}
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <h5 className="medium-14">Amount:</h5>
                <p className="text-xs">
                  {currency}
                  {order.price}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h5 className="medium-14">Status</h5>
            <select onChange={(event)=> statusHandler(event, order._id)} value={order.status}>
              <option value="Order Placed" className="text-xs font-semibold p-1 ring-1 ring-slate-900/5 rounded max-w-36 bg-primary"> Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>)
      })}
    </div>
  );
}

export default Orders;
