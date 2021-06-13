import React from "react";
import SearchResult from "./SearchResult";

const Search = (props) => {
    const [search, setSearch] = React.useState('')

    const onChangeHandler = (e) => {
        if (!e.target.value) {
            props.clearSearch()
            return setSearch('')
        }
        setSearch(e.target.value)
        props.searchBooks(search)
    }
    return (
        <div className="search">
            <div className="search__back">Back to main page</div>
            <h2>Search</h2>
            <input type="text" className="search__input" onChange={onChangeHandler} value={search} />
            <SearchResult books={props.books} changeShelf={props.changeShelf} shelves={props.shelves} />
        </div>
    )
};

export default Search;