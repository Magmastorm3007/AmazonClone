import React, { useState, useEffect } from 'react';

import './Payment.css';
import { UseStateValue } from "./stateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";

import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

import * as axios from 'axios'
import { db } from "./firebase";

function Payment() {
    const [isOpen, setIsOpen] = useState(false);
    const showModal = () => {
    setIsOpen(true);
  };
    const hideModal = () => {
    setIsOpen(false);
  };


    const [{ basket, user }, dispatch] = UseStateValue()
    const history = useNavigate()

    const stripe = useStripe();
    const elements = useElements();
    const[address,setAddress]=useState(true)
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    const getBasketTotal = (basket) => {
        return basket.reduce((price, item) => item.price + price, 0)
    }
    useEffect(() => {
       
        const getClientSecret = async () => {
            
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            }).then({
                if(err){console.log(err)}
            });
          
            setClientSecret(response.data.clientSecret)
      
        }

        getClientSecret();
    }, [basket])

    console.log('secret is', clientSecret)
    console.log('👱', user)


    const sub=(e)=>{
        e.preventDefault()
        setAddress(false)
        
    }
    const handleSubmit = async (event) => {
       
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then
        (({ paymentIntent }) => {
          
            const newpayment={
                userid:user.email,
                 basket:basket,
                 amount:getBasketTotal(basket),
                 created:new Date().toLocaleString() ,
               
               }
               axios.post('/api/details',newpayment).then(
                 console.log('success')
               )
            
            // paymentIntent = payment confirmation

          
            setSucceeded(true);
            setError(null)
            setProcessing(false)
           
            
            history('/')
      
            dispatch({
                type: 'EMPTY_BASKET'
            })

        })

       
   

    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        
        <div className='payment'>
            
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                    <form action='/' onSubmit={sub}>
  <div class="form-group">
    <label for="formGroupExampleInput">Residential Address</label>
    <input type="text" class="form-control"   required={true}  id="formGroupExampleInput"  placeholder="Enter Address"/>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">City</label>
    <input type="text" class="form-control"   required={true} id="formGroupExampleInput2" placeholder="Enter city"/>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">State</label>
    <input type="text" class="form-control"   required={true} id="formGroupExampleInput2" placeholder="Enter State/U.T"/>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Pincode</label>
    <input type="text" class="form-control"  required={true} id="formGroupExampleInput2" placeholder="Pincode of your location"/>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Phone Number</label>
    <input type="text" class="form-control" required={true} id="formGroupExampleInput2" placeholder="Enter your contact details"/>
  </div> <div class="form-group">
  <button type="submit">Confirm</button>
  </div>
</form>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>


                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                            {/* Stripe magic will go */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"INR "}
                                    />
                                    <button onClick={showModal} className='process' disabled={processing || disabled || succeeded||error||address}>
                                        <span>{processing ? "Processing" : "Purchase    "} </span>  
                                    
                                    </button>
                                </div>

                                  {/* Errors */}
                                {error && <div>{error}</div>}
                            </form>
                    </div>
                </div>
            </div>
            
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Payment Completed Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thanks for ordering on Online Bookstore</Modal.Body>
       
      </Modal>
       
        </div>
    )
}

export default Payment