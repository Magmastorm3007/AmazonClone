import axios from 'axios'
import React, { useState } from 'react'

import {  Link ,useNavigate} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
function Admin() {   const history = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
  setIsOpen(true);
 
};

const hideModal = () => {
  setIsOpen(false);
  history('/')
};
  const [i,seti]=useState({
    isbn:'',
    title: '',
    description:'', 
    image:'',
    price:'',
    stars:'',
  })
  const handleclick=(e)=>{
    e.preventDefault()
    setIsOpen(true)
    console.log(i)
    showModal()
    const newBook={
      isbn:i.isbn,
      title:i.title,
      description:i.description,
      image:i.image,
      price:i.price,
      author:i.author,
      stars:i.stars,
      
    }
    axios.post('/api/create',newBook)
   
  
  }
  const handlesub=(e)=>{
const {name,value}=e.target
seti(previnput=>{
  return {
    ...previnput,
    [name]:value
  }
})
  }
  return (
    <div className='container'>
    <h2>Add Inventory</h2>
        <form onSubmit={handleclick}>
        <div className='form-group' required={true}>
    <input onChange={handlesub} required={true}  value={i.isbn} name ="isbn" placeholder='isbn' className='form-control'></input>
  </div>
  <br></br>
  <div className='form-group'>
    <input onChange={handlesub} value={i.title} required={true} name ="title" placeholder='title'className='form-control'></input>
  </div>
  <br></br>
  <div className='form-group'>
    <input onChange={handlesub} value={i.author} required={true} name ="author" placeholder='author' className='form-control'></input>
  </div>
  <br></br>

  <div className='form-group'>
    <input onChange={handlesub} value={i.price} required={true} name ="price" placeholder='price'className='form-control'></input>
  </div>
  <br></br>
  <div className='form-group'>
    <input onChange={handlesub} value={i.image} required={true} name ="image" placeholder='image url' className='form-control'></input>
  </div>
  <br></br>
  <div className='form-group'>
    <input onChange={handlesub} value={i.stars} required={true} name ="stars" placeholder='stars' className='form-control'></input>
  </div>
  <br></br>

  <div className='form-group'>
    <textarea  onChange={handlesub}name='description'required={true} value={i.description} placeholder='description' className='form-control'/>
  </div>
  <br></br>
  <button type="submit"  className="btn btn-success" >Add Book</button>
</form>
<Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Added into Inventory Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thanks for using the demo Admin page of Bookstore</Modal.Body>
       
      </Modal>
    </div>
  )
}

export default Admin