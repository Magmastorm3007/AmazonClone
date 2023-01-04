import React,{useState,useEffect,useSearchParams} from 'react'
import { useParams } from 'react-router-dom'
import {  Link ,useNavigate} from "react-router-dom";
import Book from './Book'
function BookDetails() {
    const [books,SetBooks]=useState([
        {title: '',
        description:'',
        image: '',
        author:'',
        price:'',
        isbn:'',
        stars:''
      
      }
    ])
    

    useEffect(()=>{
        fetch('/api/book').then(res=>{
            if(res.ok)
         return res.json()
    
        }).then(js=>SetBooks(js))
      
    },[])


    
  const params=useParams()
 
  return (
    
<>
{books.filter(books=>{
if(params.bookid==books.isbn)
    return books
}
).map(book=>
<div class="row">
<div className="col-6">
 <div className="card">
          <Book
             isbn={book.isbn}
            id={book.id}
            title={book.title}
            price={parseInt(book.price)}
            rating={parseInt(book.stars)}
            image={book.image}
            author={book.author}

          />

        
        </div>


        </div>
        <div className="col-6">
            <h2>Description</h2>
            <p>{book.description}</p>
            <Link to='/'><button className='product_button'>Back to selection</button></Link>
            </div>
        </div>
     
        )}

  </>
      
  

)}

export default BookDetails