import React from "react";
import empty from "../assets/empty.png";

const BookItem = (props) => {
    const onChangeHandler = (e) => {
        props.changeShelf(props.book, e.target.value)
    }

    const image = props.book.imageLinks ? props.book.imageLinks.smallThumbnail : empty
    return (
        <div className="book">
            <figure className="book__image">
                <picture>
                    <img src={image} alt={props.book.title} />
                </picture>
            </figure>
            <div className="book__info">
                <div className="book__title">{props.book.title}</div>
                <div className="book__author">{props.book.publisher}</div>
            </div>
            <div className="book__actions">
                <select name="move_to" id="move_to" className={`book__action ${props.book.shelf}`} value={props.book.shelf} onChange={onChangeHandler}>
                    <option disabled={true}>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want To Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>
    )
};

export default BookItem;