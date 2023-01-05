import React,{useEffect,useState} from 'react'
import PurchasedProduct from "./PurchasedProduct";
import { UseStateValue } from "./stateProvider";
import CurrencyFormat from "react-currency-format";
function Order() {
  const [{  user }] = UseStateValue()
  const [order,SetOrders]=useState([])
  useEffect(()=>{
    fetch('/api/payments').then(res=>{
        if(res.ok)
     return res.json()
    }).then(js=>SetOrders(js))
   
},[])

/*
 <CheckoutProduct
                
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
*/
  return (
    
      
   
    <div className='Order'>
    <div>
      <h2><b>Products you purchased recently</b></h2>
    {order.filter(orders => {
    if (orders.userid==user.email) {
      return orders;
    } 
  })
    .map(orders => (
      <div> <h5>Time:{orders.created}</h5>
            <h5>Amount: Rs {orders.amount}</h5>
            <h5>Order-ID:{orders._id}</h5>
           
            <p>{Object.keys(orders.basket).map(i=>
            <p> <PurchasedProduct title={orders.basket[i].title}  id={orders.basket[i].id}
         
            image={orders.basket[i].image}
            price={orders.basket[i].price}
            rating={orders.basket[i].rating}
            hideButton/></p>
            
            
            
            )}</p>
            
               
               </div>
            ))} 
            

    </div>
    
    </div>
    
  )
}

export default Order