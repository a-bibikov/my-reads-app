import React from "react";

const BookItem = (props) => {
    return (
        <div className="book">
            <figure className="book__image">
                <picture>
                    <img src={props.book.imageLinks.smallThumbnail} alt=""/>
                </picture>
            </figure>
            <div className="book__info">
                <div className="book__title">{props.book.title}</div>
                <div className="book__author">{props.book.publisher}</div>
            </div>
            <div className="book__actions">
                <button onClick={() => props.changeShelf(props.book, "read")}>Change to Read</button>
                <select name="" id="" className="book__action">
                    <option value="">Move to...</option>
                    <option value="">Read</option>
                </select>
            </div>
        </div>
    )
};

export default BookItem;