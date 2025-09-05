import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

function Item({ product }) {
  const { navigate, addToCart } = useContext(ShopContext);
  const [hover, setHover] = useState(false);
  return (
    
    <div className="overflow-hidden bg-white p-5">
      {/* image */}
      <div
        onClick={() => {
          navigate(
            `/collection/${product.category.toLowerCase()}/${product._id}`
          );
          scrollTo(0, 0);
        }}
        onMouseEnter={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
        className="flexcenter bg-(#f5f5f5) overflow-hidden relative"
      >
  
<img
  src={
    Array.isArray(product.image) && product.image.length > 1 && hover
      ? product.image[1]
      : Array.isArray(product.image)
      ? product.image[0]
      : "fallback.jpg" // optional fallback image
  }
  alt="productImage"
  className="group-hover:bg-primaryDeep transition-all duration-300"
/>


      </div>
      {/* info */}
      <div className="pt-3">
        <h4 className="blof-15 line-clamp-1 !py-0 uppercase">{product.name}</h4>
        <p className="line-clamp-1">{product.description}</p>
        <div className="flexBeteen pt-2 gap-2">
          <p className="h5">{product.category}</p>
        <button onClick={()=>addToCart(product._id)}  className="btn-outline !py-2 !px-0 w-full !text-xs">
          Add to Cart | ${product.offerPrice}.00
        </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
