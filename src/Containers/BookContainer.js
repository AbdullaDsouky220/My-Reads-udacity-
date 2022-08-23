import React, { useState, useEffect, createContext, memo } from "react";
import SearchBooks from "../components/SearchBooks";
import * as BooksApi from "../BooksAPI";
import { Route, Routes } from "react-router-dom";
import BooksLists from "../components/BooksLists";
import { CircularProgress, Box } from "@mui/material";
import { Stack } from "@mui/system";
import Notfound from "../components/Notfound";

function BookContainer() {
  //this is where is the state lives
  const [loading, setLoading] = useState(true);
  const [allBooks, setAllBooks] = useState([]);
  const [update, setUpDate] = useState({});

  useEffect(() => {
    //get all the books fron our api
    const getBooks = async () => {
      const res = await BooksApi.getAll();
      //set the fetched data
      setAllBooks(res);
      //set the loading to false to stop loading
      setLoading(false);
    };
    getBooks();
    return () => {
      //do some clean up
      const getBooks = async () => {
        const res = await BooksApi.getAll();
        //set the fetched data
        setAllBooks(res);
        //set the loading to false to stop loading
        setLoading(false);
      };
      getBooks();
    };
  }, [update]);

  // const updateBookStatus = async (book, shelf) => {
  //   const update = await BooksApi.update(book, shelf);
  //   setUpDate(update);
  // };
  // Filter out the book and append it to the end of the list
// so it appears at the end of whatever shelf it was added to.
const updateBookStatus = (book, shelf) => {
  book.shelf = shelf;
   BooksApi.update(book, shelf).then(() => {
  setAllBooks([...allBooks.filter((b) => b.id !== book.id), book]);
  });
  };

  return (
    <>
      {loading ? (
        <Stack
          sx={{ display: "flex" }}
          spacing={16}
          direction="column"
          alignItems="center"
          justify="center"
          className='container'
          
        >
          <CircularProgress />
        </Stack>
      ) : (
        <div>
          <Routes>
            <Route
              path="/search"
              element={
                <SearchBooks
                  books={allBooks}
                  updateBookStatus={updateBookStatus}
                />
              }
            />
            <Route
              path="/"
              element={
                <BooksLists
                  updateBookStatus={updateBookStatus}
                  books={allBooks}
                />
              }
            />
            <Route element={<Notfound/>} path='*'></Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default memo(BookContainer);
