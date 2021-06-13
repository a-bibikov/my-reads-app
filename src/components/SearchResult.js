import React from "react";
import BookItem from "./BookItem";

const SearchResult = (props) => {
    let booksAtShelves = []
    props.shelves.forEach((item) => {
        const items = item.items.flat()
        booksAtShelves.push(items)
    })
    booksAtShelves = booksAtShelves.flat();

    const booksList = booksAtShelves.map(item => {
        return {
            id: item.id,
            shelf: item.shelf
        }
    })

    // console.log(booksList)
    return (
        <div className="search__result">
            <div className="search__list">
                {props.books && props.books.length !== 0 && !props.books.error
                    ? props.books.map(book => {
                        const bookIndex = booksList.findIndex(({id}) => book.id === id)
                        if (bookIndex > -1) {
                            book.shelf = booksList[bookIndex].shelf;
                        } else {
                            book.shelf = "none";
                        }
                        return <BookItem key={book.id} book={book} changeShelf={props.changeShelf} />
                    })
                    : <div className="search__empty">Empty results</div>
                }
            </div>
        </div>
    )
};

export default SearchResult;