import { Route, Router, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection"
import CategoryCollection from "./pages/CategoryCollection"
import Header from "./components/Header";
import ProductDetails from "./pages/ProductDetails"
import Footer from "./components/Footer" 
import Testimonial from "./pages/Testimonial"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import PlaceOrder from "./pages/PlaceOrder"
import MyOrders from "./pages/MyOrders"
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Admin/Sidebar";
import AdminLogin from "./components/Admin/AdminLogin";
import Add from "./pages/Admin/Add";
import Orders from "./pages/Admin/Orders";
import List from "./pages/Admin/List";
import Loading from "./pages/Loading";

function App() {
  const {userLogin, isAdmin} = useContext(ShopContext)

  const location = useLocation()
  const isAdminpath = location.pathname.includes("admin")

  return (
    <main className="overflow-hidden text-tertiary">
      {userLogin && <Login/>}
  {!isAdminpath && <Header/>}
   <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:category" element={<CategoryCollection />} />
        <Route path="/collection/:category/:id" element={<ProductDetails />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/placeOrder" element={<PlaceOrder/>} />
        <Route path="/my-orders" element={<MyOrders/>} />
        <Route path="/loader" element={<Loading/>} />
        {/* Admin Pannel Route */}
        <Route path="/admin" element={isAdmin ? <Sidebar/> : <AdminLogin/>}>
        <Route index element={isAdmin ? <Add/> : null}/>
        <Route path="list" element={<List/>}/>
        <Route path="orders" element={<Orders/>}/>
        </Route>

      </Routes>
      {!isAdminpath && <Footer />}
    </main>
  );
}

export default App;
