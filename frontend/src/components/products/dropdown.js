import React from 'react'

export default function Dropdown({clickHandler, dropDownValue}) {
    return (
            <select onChange={clickHandler} value={dropDownValue}>
                {console.log(dropDownValue)}
                <option value="id">Relevance</option>
                <option value="price">Price</option>
                <option value="author">Author</option>
                <option value="title">Title</option>
              </select>
    )
}
