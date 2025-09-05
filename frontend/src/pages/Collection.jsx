import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import Item from '../components/Item'


function Collection() {
  const {products, showSearch} = useContext(ShopContext)
  const [filteredProducts, setFilteredProducts] = useState([])
const [currentPage, setcurrentPage] = useState(1)
const itemPerPage = 10;

  useEffect(()=>{
    if(showSearch.length > 0){
      setFilteredProducts(
        products.filter((product)=> product.name.toLowerCase().includes(showSearch.toLowerCase()))
      )
    } else {
       setFilteredProducts(products)
    }
    setcurrentPage(1)
  }, [products, showSearch])

 const totalPages = Math.ceil(filteredProducts.filter(p=> p.inStock).length /itemPerPage)

 useEffect(()=>{
  window.scrollTo({top: 0, behaviour:"smooth"})
 }, [currentPage])

  return (
    <div className='max-padd-container pt-28 py-16 bg-primary'>
     <Title
        title1={"All"}
        title2={"Products"}
        titleStyles={"pb-10"}
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 '>
        {filteredProducts.length > 0 ? (
          filteredProducts.filter((product) => product.inStock).slice((currentPage-1) * itemPerPage, currentPage *itemPerPage).map((product)=>(
            <Item key={product._id} product={product}/>
          ))
        ) : (
          <h4 className='h4 text-red-500'> Oops! Nothing Match with Your search
          </h4>
        )}
      </div>
      {/* Pagenation */}
      <div className='flexCenter flex-wrap gap-2 sm:gap-4 mt-14 mb-10'>
      <button
      disabled={currentPage===1}
      onClick={()=>setcurrentPage((prev)=>prev-1)}
      className={`${currentPage === 1 && "opacity-50 cursor-not-allowed"} btn-dark !py-1 !px-3`}
      >
        Previous</button>
        {Array.from({length: totalPages}, (_, index) =>(
          <button
          key={index + 1}
          onClick={ ()=> setcurrentPage(index + 1)}
         className={`${currentPage=== index+1 && "!bg-tertiary !text-white"} btn-white !py-1 !px-3`}
          >
             {index + 1}
          </button>
        ))}
        
          <button
      disabled={currentPage===totalPages}
      onClick={()=>setcurrentPage((prev)=>prev+1)}
           className={`${currentPage === totalPages && "opacity-50 cursor-not-allowed"} btn-dark !py-1 !px-3`}
           >
        Next</button>

      </div>
    </div>

  )
}

export default Collection