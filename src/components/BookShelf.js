import React from "react";
import Book from "./Book";
import PropTypes from 'prop-types'; // ES6

function BookShelf({ header,books,updateBookStatus }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{header}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid" list-of-book='true'>
          {books.map((book)=>{
            return <Book books={books}shelf={book.shelf?book.shelf:'currentlyReading'} updateBookStatus={updateBookStatus} book={book} key={book.id}imageUrl={book.imageLinks.smallThumbnail} title={book.title} author={book.authors}/>
          })}
        </ol>
      </div>
    </div>
  );
}
BookShelf.propTypes={
  
  header:PropTypes.string,
  updateBookStatus:PropTypes.func,
  books:PropTypes.array,

}


export default BookShelf;
