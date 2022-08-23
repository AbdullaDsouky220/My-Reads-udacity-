import React from 'react'
import BookShelfChanger from "./BookShelfChanger";
import PropTypes from 'prop-types'; // ES6

function Book({imageUrl,title,author,shelf,updateBookStatus,book}) {
  return (
    <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              `url(${imageUrl})`,
          }}
        ></div>
        <BookShelfChanger shelf={shelf} book={book} updateBookStatus={updateBookStatus}/>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{author}</div>
    </div>
  </li>
  )
}
Book.propTypes={
  imageUrl: PropTypes.string,
  title:PropTypes.string,
  author:PropTypes.array,
  shelf:PropTypes.string,
  updateBookStatus:PropTypes.func,
  book:PropTypes.object,

}

export default Book
