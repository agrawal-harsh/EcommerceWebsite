import React from "react";
import Product from "./Product";


function ProductList({items}) {
  
  return(
    items.map(item => {
      return <Product
               key={item.id}
               { ...item}/>
    })
  )
}
export default ProductList;