import "../index.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaSearch, FaShoppingBasket } from "react-icons/fa";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { RiUserLine } from "react-icons/ri";
import {userImg} from "../assets/data"
import { ShopContext } from "../context/ShopContext";

function Header() {
  const {
    user,
    navigate,
    showSearch,
    setshowSearch,
    setUserLogin,
    getCartCount,
    logoutuser,
  } = useContext(ShopContext);

  const [menu, setMenu] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // ✅ separate state for input

  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const isCollectionPage = location.pathname.endsWith("/collection");

  // Toggle Menu
  const toggleMenu = () => setMenu((prev) => !prev);

  // Navigate when typing in search
  useEffect(() => {
    if (searchValue.length > 0 && !isCollectionPage) {
      navigate("/collection");
    }
  }, [searchValue]);

  return (
    <header
      className={`absolute top-0 left-0 right-0 max-padd-container flexBetween py-2 ${
        isHomepage ? "bg-gradient-to-r from-primary via-white to-primary" : ""
      }`}
    >
      {/* Logo */}
      <Link to={"/"} className="bold-20 sm:bold-22 uppercase font-paci">
        My Store <span className="text-secondary bold-28 max-sm:hidden">.</span>
      </Link>

      {/* Navbar */}
      <Navbar
        setMenu={setMenu}
        containerStyles={`${
          menu
            ? "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white shadow-md w-52 ring-1 ring-slate-900/5 z-50"
            : "hidden lg:flex gap-x-5 xl:gap-x-1 medium-15 p-1"
        }`}
      />

      <div className="flex gap-8 items-center">
        {/* Search */}
        <div className="relative xl:flex">
          <div
            className={`${
              showSearch
                ? "flex rounded-full bg-white w-[333px] p-3.5 pl-6"
                : "hidden"
            } ${!isHomepage && "!bg-primary"}`}
          >
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Type here..."
              className="bg-transparent w-full outline-none text-[14px]"
            />
          </div>
          <div
            onClick={() => setshowSearch((pre) => !pre)}
            className={`cursor-pointer bg-tertiary text-white rounded-full p-2.5 text-sm m-1 ${
              showSearch ? "absolute top-0 right-0" : ""
            }`}
          >
            <FaSearch />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex flex-1 items-center justify-end gap-x-2 xs:gap-x-8">
          {/* Menu Toggle */}
          {menu ? (
            <FaBarsStaggered
              onClick={toggleMenu}
              className="lg:hidden cursor-pointer text-xl"
            />
          ) : (
            <FaBars
              onClick={toggleMenu}
              className="lg:hidden cursor-pointer text-xl"
            />
          )}

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="flex gap-2 items-center cursor-pointer p-2 rounded-full bg-white relative"
          >
            <FaShoppingBasket size={27} />
            <label className="absolute bottom-8 right-4 -top-1 text-xs font-bold">
              {getCartCount()}
            </label>
          </div>

          {/* User Profile */}
          <div className="group relative">
            {user ? (
              <div className="flex gap-2 items-center cursor-pointer rounded-full bg-white">
                <img
                  src= {userImg}
                  alt="UserImage"
                  className="w-[44px] h-[44px] rounded-full object-cover"
                />
              </div>
            ) : (
              <button
                onClick={() => setUserLogin(true)}
                className="btn-dark flexCenter gap-x-2 rounded-full"
              >
                Login
                <RiUserLine className="text-xl" />
              </button>
            )}

            {/* Dropdown */}
            {user && (
              <ul className="bg-white p-2 w-32 ring-1 ring-slate-900/5 rounded absolute right-0 top-7 hidden group-hover:flex flex-col medium-14 shadow-md z-50">
                <li
                  onClick={() => navigate("/my-orders")}
                  className="p-2 text-tertiary rounded-md hover:bg-primary cursor-pointer"
                >
                  Orders
                </li>
                <li
                  onClick={logoutuser}
                  className="p-2 text-tertiary rounded-md hover:bg-primary cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
