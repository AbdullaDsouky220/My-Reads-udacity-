import React from 'react'
import PropTypes from 'prop-types'; // ES6

function BookShelfChanger({shelf,book,updateBookStatus}) {
  const changeStatusHandler=(e)=>{
    updateBookStatus(book,e.target.value)
  }
  return (
    <div className="book-shelf-changer">
    <select value={shelf!==null?shelf:null} onChange={(e)=>changeStatusHandler(e)}>
      <option disabled>
        Move to...
      </option>
      <option value="currentlyReading">
        Currently Reading
      </option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
  )
}
BookShelfChanger.propTypes={
 
  shelf:PropTypes.string,
  updateBookStatus:PropTypes.func,
  book:PropTypes.object,
}

export default BookShelfChanger
