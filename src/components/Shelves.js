import React from "react";
import Shelf from "./Shelf";
import {Link} from "react-router-dom";

const Shelves = (props) => {
    return (
        <div className="shelves">
            {props.shelves.map((item) => {
                return <Shelf key={item.title} shelf={item} changeShelf={props.changeShelf} />
            })}
            <Link to="/search" className="search__button">Add a book</Link>
        </div>
    )
};

export default Shelves;