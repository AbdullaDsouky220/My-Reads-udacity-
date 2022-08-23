import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import BookShelf from "./BookShelf";
import Header from "./Header";
import PropTypes from 'prop-types'; // ES6

function BooksLists({ books,updateBookStatus }) {

  const [CurrentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [WantToReadBooks, setWantToReadBooks] = useState([]);
  const [ReadBooks, setReadBooks] = useState([]);
  useEffect(() => {
    const CurrentlyReadingBooks = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const WantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
    const ReadBooks = books.filter((book) => book.shelf === "read");
    setCurrentlyReadingBooks(CurrentlyReadingBooks);
    setWantToReadBooks(WantToReadBooks);
    setReadBooks(ReadBooks);
  },[books]);

//update the list function from the api

  return (
    <div className="list-books">
        <Header />
        <div className="list-books-content">
          <div>
            <BookShelf
              updateBookStatus={updateBookStatus}
              books={CurrentlyReadingBooks}
              header="Currently Reading"
            />
            <BookShelf
              updateBookStatus={updateBookStatus}
              books={WantToReadBooks}
              header="Want to  Read"
            />
            <BookShelf
              updateBookStatus={updateBookStatus}
              books={ReadBooks}
              header="Read"
            />
          </div>
        </div>
        <div className="open-search">
          <NavLink className="navbar-item" to="/search" exact={'false'}>
            Add A Book
          </NavLink>
        </div>
    
    </div>
  );
}
BooksLists.propTypes={

  updateBookStatus:PropTypes.func,
  books:PropTypes.array,
}
export default BooksLists;
