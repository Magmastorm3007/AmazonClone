import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Header from './Header';
import Checkout from './Checkout';
import Login from './Login';
import Order from './Order'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { useEffect } from 'react';
import { auth } from './firebase';
import { UseStateValue } from './stateProvider';
import Payment from './Payment';
import Admin from './Admin'
import  {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"

const promise=loadStripe('pk_test_51LEEGeSGbGUoxFPisnR9uswfjBIYnpoBDjn4GuanYp1p5Q5egXeeri6oHcN6N4h8rjdRXxLEW83eX0IEuAsEgCkg00lGOesFEZ')

function App() {
  const [{},dispatch]=UseStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log("Auth user is >>>>"+authUser);
      
      if(authUser){
        dispatch(
          {type:'SET_USER',
          user: authUser
      })
      }
      
      else{
        dispatch(
          {type:'SET_USER',
          user: null
      })

      }
      
    })
  },[])
  return (
 <Router>
 
    <div className="App">
      <Header/>
        <Routes>
        <Route path="/checkout" element={<Checkout/>} />
    <Route path="/" element={<Home/>} />
    <Route path="/payment" element={<><Elements stripe={promise}><Payment/></Elements></>} />
    <Route path="/orders" element={<Order/>} />
    <Route path="/login" element={<Login/>} />
    <Route path='/admin' element={<Admin/>}/>

   
        </Routes>
</div>
</Router>
  );
}

export default App;
