import React, { memo, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Book from "./Book";
import * as BooksApi from "../BooksAPI";
import PropTypes from 'prop-types'; // ES6

import { CircularProgress, Typography } from "@mui/material";
function SearchBooks({ updateBookStatus, books }) {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState([]);
  const [WrongInput, setWrongInput] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const setInputHandler = (e) => {
    if (e.target.value) {
      setInputValue(e.target.value);
    }
    setResult([]);
    return setSearching(false);
  };

  useEffect(() => {
   

    const debounceTimeout = setTimeout(() => {
      const SearchBook = async (inputValue, max) => {
        setLoading(true);
        setSearching(true);
        const res = await BooksApi.search(inputValue, max);
        if (res.error) {
          setWrongInput(true);
          setLoading(false);
        } else {
          setLoading(false);
          setResult(res);
          setWrongInput(false);
        }
      };
      if (inputValue !== "") {
        return SearchBook(inputValue);
      }
    }, 1);
    return () => {
      //do some clean up
      //remove this time out from the memory to prevent memory leak
      clearTimeout(debounceTimeout);
    };
  }, [inputValue]);
  const filterToGetShelf = (id) => {
    const findbook = books.filter((book) => book.id == id);
    if (findbook[0]) {
      return findbook[0].shelf;
    }
    return "none";
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <NavLink className="close-search" to="/" exact={"false"}>
          Close
        </NavLink>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => setInputHandler(e)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {!searching ? (
            <Typography
              variant="h6"
              color="#2196f3
"
            >
              Search for a book
            </Typography>
          ) : loading ? (
            <CircularProgress />
          ) : result !== [] ? (
            WrongInput ? (
              <Typography variant="h5" color="red">
                There is No matches for {inputValue}
              </Typography>
            ) : (
              result.map((book) => {
                return (
                  <Book
                    key={book.id}
                    imageUrl={
                      book.imageLinks
                        ? book.imageLinks.smallThumbnail
                        : "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=400"
                    }
                    title={book.title}
                    author={book.authors}
                    updateBookStatus={updateBookStatus}
                    shelf={
                      filterToGetShelf(book.id)
                        ? filterToGetShelf(book.id)
                        : null
                    }
                    book={book}
                  />
                );
              })
            )
          ) : (
            null
          )}
        </ol>
      </div>
    </div>
  );
}
SearchBooks.propTypes={

  updateBookStatus:PropTypes.func,
  books:PropTypes.array,

}


export default memo(SearchBooks);
