import axios from 'axios'
import React, { useState } from 'react'

function Admin() {
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
    console.log(i)

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
    
        <form>
        <div className='form-group'>
    <input onChange={handlesub} value={i.isbn} name ="isbn" placeholder='isbn' className='form-control'></input>
  </div>
  <br></br>
  <div className='form-group'>
    <input onChange={handlesub} value={i.title} name ="title" placeholder='title'className='form-control'></input>
  </div>
  <br></br>
  <div className='form-group'>
    <input onChange={handlesub} value={i.author} name ="author" placeholder='author' className='form-control'></input>
  </div>
  <br></br>

  <div className='form-group'>
    <input onChange={handlesub} value={i.price} name ="price" placeholder='price'className='form-control'></input>
  </div>
  <br></br>
  <div className='form-group'>
    <input onChange={handlesub} value={i.image} name ="image" placeholder='image' className='form-control'></input>
  </div>
  <br></br>
  <div className='form-group'>
    <input onChange={handlesub} value={i.stars} name ="stars" placeholder='stars' className='form-control'></input>
  </div>
  <br></br>

  <div className='form-group'>
    <textarea  onChange={handlesub}name='description' value={i.description} placeholder='description' className='form-control'/>
  </div>
  <button onClick={handleclick} type="submit" className="btn btn-success">Add Book</button>
</form>
    </div>
  )
}

export default Admin