import React,{useState,useEffect} from "react";
import "./Home.css";
import Product from "./Product";

function Home({list,SetList}) {
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
    console.log(list)
},[list])
  return (
    <div className="home">
     
      <div className="home__container">
        <img
          className="home__image"
          src="https://manojchahar.com/wp-content/uploads/2020/10/becca-tapert-Gn.jpg"
          alt=""
        />

<div class="row">
{books.filter(book => {
    if (list=== '') {
      return book;
      
    
    } else if (book.title.toLowerCase().includes(list.toLowerCase())) {
      return book;
    }
  })
.map(book=>

<div class="col-4">
 <div class="card">
          <Product
             isbn={book.isbn}
            id={book.id}
            title={book.title}
            price={parseInt(book.price)}
            rating={parseInt(book.stars)}
            image={book.image}
            author={book.author}

          />
<h1></h1>

        </div>
        </div>
       
        )}
         </div>
      </div>
    </div>
  );
}

export default Home;
