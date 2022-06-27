import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'
import SearchIcon from "@mui/icons-material/Search"
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import {  Link } from "react-router-dom";
import { UseStateValue } from './stateProvider';
import { auth } from './firebase';
function header() {
const [{basket,user},dispatch]=UseStateValue();
const authenticate=()=>{
  if(user)
  auth.signOut();
}
  return (
    <div className='header'>
      <Link to ="/">
<img className="header__logo" alt="head" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"/>
</Link>
<div className="header-search">
<input className="header-searchInput" type="text" />
<SearchIcon className="header_searchIcon" />
    </div>
    <div className="header_nav">
    <Link  to ={!user&&'/login'}>
<div onClick={authenticate} className="header_option">

<span className='header-optionLineOne text-decoration-none'><a>Hello {!user ? 'Guest':user.email}</a> </span>
<span className='header-optionLineTwo'>{user ?'Sign Out':'Sign In'}</span>

</div></Link>

<div className="header_option">
<span className='header-optionLineOne'>Returns</span>
<span className='header-optionLineTwo'>Orders</span>
</div>
<div className="header_option">
<span className='header-optionLineOne'> Yours</span>
<span className='header-optionLineTwo'>Prime</span>
</div>


        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default header