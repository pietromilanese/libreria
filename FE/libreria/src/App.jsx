import React, { useState, useEffect } from 'react';
import { getBooks } from './API/apiService';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
   getBooks().then((res)=>{
    setBooks(res);
   })
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>Title:</strong> {book.title}, <strong>Author:</strong> {book.author}, {book.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
