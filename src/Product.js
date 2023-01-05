import React from "react";
import "./Product.css";
import { UseStateValue } from "./stateProvider";
import {  Link } from "react-router-dom";
function Product({ id, title, image, price, rating,author,isbn }) {
  const [{ basket }, dispatch] = UseStateValue();
  console.log(rating)
  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p><b>{title}</b></p>
       
   
        <div className="product-rating">
       
      
        </div>
        
      </div>

      <img className="product__img" src={image} alt="" />
      <div className="product__info">
        <p>Written by {author}</p>
           
        <p className="product__price">
          <small>Rs.</small>
          <strong>{price}</strong>
        </p>
        </div>
        <Link to={"/book/"+isbn}> <button className="product_button">View item</button></Link>  

    </div>
  );
}

export default Product;
