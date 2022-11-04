import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { UseStateValue } from './stateProvider'
import {Link,useNavigate } from "react-router-dom";
import "./Subtotal.css"
function Subtotal() {
  const history=useNavigate()

  const [{basket}] = UseStateValue() // Pull the basket from useStateValue

  // Homework - Calculate basket total
  const calculateTotal = (basket) => {
      return basket.reduce((price, item) => item.price + price, 0)
  }
  return (
    <div className="Subtotal">
        <CurrencyFormat 
        renderText={(value)=>(//homework /*basket.length*/ value
            <> 
            <p>SubTotal ({basket.length} items):<strong>Rs{calculateTotal(basket)}</strong></p>
            <small className="subtotal__gift">
                <input type="checkbox" />This order contains a gift
            </small>
            </>
           
        )}
        decimalScale={2}
        value={0}//getBasketTotal(basket) 
        displayType={"text"}
        thousandSeperator={true}
        prefix={"Rs"}
        />
        <button onClick={e=>{history('/payment')}}>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal