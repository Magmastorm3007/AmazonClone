import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'
import SearchIcon from "@mui/icons-material/Search"
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import {  Link } from "react-router-dom";
import { UseStateValue } from './stateProvider';
import { auth } from './firebase';
import { useNavigate } from "react-router-dom";
function Header({list,SetList}) {   const history = useNavigate()
const [{basket,user},dispatch]=UseStateValue();

const [query, setQuery] = useState("")
const authenticate=()=>{
  if(user)
  {
  auth.signOut();
 }
  if(!user){
  history('/')
  }
}
  return (
    <div className='header'>
      <Link to ="/">
<img className="header__logo" alt="head" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/c46c7f62556223.5a945f059c90e.png"/>
</Link>
<div className="header-search">
<input className="header-searchInput" type="text" onChange={e=>SetList(e.target.value)}/>
<SearchIcon className="header_searchIcon" />
    </div>
    <div className="header_nav">

         
    <Link to="/admin">
          <div className="header__optionBasket">
            <span>Admin</span>
           
          </div>
        </Link>
    <Link  to ={!user?'/login':'/'}>
<div onClick={authenticate} className="header_option">

<span className='header-optionLineOne text-decoration-none'><a>Hello {!user ? 'Guest':user.email}</a> </span>
<span className='header-optionLineTwo'>{user ?'Sign Out':'Sign In'}</span>

</div></Link>
<Link to ={user?'/orders':'/login'}>
<div className="header_option">  

<span className='header-optionLineOne'>Returns</span>
<span className='header-optionLineTwo'>Orders</span>

</div>

</Link>
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

export default Header