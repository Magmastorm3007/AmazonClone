import React from 'react'
import "./Checkout.css"
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal'
import { UseStateValue } from './stateProvider';
function Checkout() {    const [{basket,user},dispatch]=UseStateValue();
  return (
    <div className="checkout">
            <div className="checkout__left">
      <img className='checkout__ad' src="https://rukminim1.flixcart.com/flap/1800/1800/image/b3fe381767050079.jpg?q=80" alt=""/>
     <div>
      <h3>Hello {user?.email||'guest'}</h3>
         <h2 className="checkout__title">Your Shopping Basket</h2>
         
          {basket.map(item=>(
            <CheckoutProduct id={item.id} 
            title={item.title} 
             image={item.image} 
            price={item.price} 
            rating={item.rating} />
            
            
            
            ))}
            
          
         
     </div>
      </div>

      <div className="checkout__right">
          
        
        <Subtotal/>

          </div>
  </div>

  )
}

export default Checkout