import React from "react";
import "./Product.css";
import { UseStateValue } from "./stateProvider";

function Product({ id, title, image, price, rating,author }) {
  const [{ basket }, dispatch] = UseStateValue();

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
        <p>{title}</p>
       
      
        <p className="product__price">
          <small>Rs.</small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        
      </div>

      <img src={image} alt="" />
      <div className="product__info">
        <p>Written by {author}</p>
        </div>

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
