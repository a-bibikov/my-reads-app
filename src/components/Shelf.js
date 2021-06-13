import React from "react";
import BookItem from "./BookItem";

const Shelf = (props) => {
    if(props.shelf.items === undefined) return "Loading..."
    return (
        <div className="shelf">
            <h2 className="shelf__title">{props.shelf.title}</h2>
            <div className="shelf__list">
                {props.shelf.items.map(item => {
                    return <BookItem key={item.id} book={item} changeShelf={props.changeShelf} />
                })}
            </div>
        </div>
    )
};

export default Shelf;