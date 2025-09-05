import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const ShopContext = createContext();

function ShopContextProvider({ children }) {
  const currency = import.meta.env.VITE_CURRENCY;
  const deliveryCharges = 10;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setproducts] = useState([]);
  const [showSearch, setshowSearch] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  // function fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setproducts(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch user
  const fetchUser = async () => {
    try {
      const { data } = await axios.post("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartData);
      } else {
        setUser(null);
        setCartItems({});
      }
    } catch (error) {
      setUser(null);
      setCartItems({});
    }
  };

  // Handle login success
  const handleLoginSuccess = async () => {
    await fetchUser();
    navigate("/");
  };

  // logout user
  const logoutuser = async () => {
    try {
      const { data } = await axios.post("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        setCartItems({});
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch Admin
  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get("/api/admin/is-auth");
      setIsAdmin(data.success);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  // add to cart
  const addToCart = async (itemId, size) => {
    if (!size) return toast.error("Please select a size");
    let cartData = structuredClone(cartItems);
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);
    // toast.success("Product added to cart");

    if (user) {
      try {
        const { data } = await axios.post("api/cart/add", { itemId, size });
        if (data.success) {
          toast.success(data.message);
        } 
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // cart total items
  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    return count;
  };

  // get total Amount of Cart Items
  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += product.offerPrice * cartItems[itemId][size];
      }
    }
    return total;
  };

  // update cart quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (user) {
      try {
        const { data } = await axios.post("/api/cart/update", {
          itemId,
          size,
          quantity,
        });
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

useEffect(() => {
  fetchProducts();
  fetchUser();

  // only check admin when necessary
  if (window.location.pathname.startsWith("/admin")) {
    fetchAdmin();
  }
}, []);

  const value = {
    fetchProducts,
    products,
    user,
    setUser,
    navigate,
    showSearch,
    setshowSearch,
    currency,
    userLogin,
    setUserLogin,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    getCartAmount,
    updateQuantity,
    deliveryCharges,
    isAdmin,
    setIsAdmin,
    axios,
    handleLoginSuccess,
    logoutuser,
    fetchUser,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export { ShopContext };
export default ShopContextProvider;
