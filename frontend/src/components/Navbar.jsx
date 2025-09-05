import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ containerStyles, setMenu }) {
  const navLinks = [
    {
      path: "/",
      title: "home",
    },
    {
      path: "/collection",
      title: "Collection",
    },
    {
      path: "/testimonial",
      title: "Testimonial",
    },
    {
      path: "/contact",
      title: "Contact",
    },
  ];

  return(
  <nav className={`${containerStyles}`}>
   {navLinks.map((link)=>(
    <NavLink
      onClick={()=> setMenu(false) }
     key={link.title}
     to={link.path}
     className={({isActive}) => `${isActive ? "active-link" : ""} px-3 py-2 rounded-full uppercase text-sm font-bold`}
     >
      {link.title}
    </NavLink>
   ))}
   </nav> 
  );
}

export default Navbar;
