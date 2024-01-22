import React, { useState, useEffect } from 'react';
import './home.css'
import { Link } from 'react-router-dom';

function home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(apiUrl + '/books')	
      .then(res => res.json())
      .then(books => setBooks(books));
  }, []);

  return (
    <div className="home">
      <div className='book-list'>
        {books.map((book) => {
          return (
            <div className='book' key={book._id}>
              <div className='book-image'>
                <img src={book.thumbnail} alt={book.title} />
              </div>
              <div className='book-button'>
                <Link to={`/book/${book._id}`}><button>Read</button></Link>
            </div>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default home