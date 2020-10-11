import React from 'react'

export default function Dropdown({clickHandler}) {
    return (
            <select onClick={clickHandler}>
                <option value="id">Relevance</option>
                <option value="price">Price</option>
                <option value="author">Author</option>
                <option value="title">Title</option>
              </select>
    )
}
