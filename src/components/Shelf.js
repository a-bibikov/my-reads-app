import React from "react";
import BookItem from "./BookItem";

const Shelf = (props) => {
    return (
        <div className="shelf">
            <h2 className="shelf__title">{props.shelf.title}</h2>
            <div className="shelf__list">
                {props.shelf.items === undefined|| props.shelf.items.length === 0 ? <div className="shelf__loading">Loading books</div> : props.shelf.items.map(item => {
                    return <BookItem key={item.id} book={item} changeShelf={props.changeShelf} />
                })}
            </div>
        </div>
    )
};

export default Shelf;