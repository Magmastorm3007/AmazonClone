import React from 'react'
import Checkout from './Checkout'
import './CheckoutProduct.css'
import { UseStateValue } from './stateProvider'

function CheckoutProduct({id,image,title,price,rating}) {
    const [{basket},dispatch]=UseStateValue();
const remove=()=>{
dispatch({
    type:"REMOVE_FROM_BASKET",
    id:id,
})
}
  return (
    <div className="checkoutProduct">
        <img className='checkoutProduct__image' src={image}/>
        <div className='checkoutProduct__info'>
            <p className='checkoutProduct__title'>{title}
            </p>
            <p className='checkoutProduct__price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
<div className='checkoutProduct__rating'>

{Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
</div>
<button onClick={remove}>Remove from Basket</button>
        </div>

    </div>
  )
}

export default CheckoutProduct