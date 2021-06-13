import React from "react";
import Shelf from "./Shelf";

const Shelves = (props) => {
    return (
        <div className="shelves">
            {props.shelves.map((item) => {
                return <Shelf key={item.title} shelf={item} changeShelf={props.changeShelf} />
            })}
        </div>
    )
};

export default Shelves;