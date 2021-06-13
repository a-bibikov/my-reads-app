import React from "react";
import './App.sass';
import * as BooksAPI from './BooksAPI';
import Shelves from "./components/Shelves";

class App extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        books: [],
        shelves: [
            {
                id: "currentlyReading",
                title: "Currently Reading",
                items: []
            },
            {
                id: "wantToRead",
                title: "Want to Read",
                items: []
            },
            {
                id: "read",
                title: "Read",
                items: []
            },
        ]
    }
    getData () {
        BooksAPI.getAll()
            .then(res => {
                this.setState({
                    books: res
                })
                const shelvesUpdated = this.state.shelves.map((item) => {
                    return {
                        id: item.id,
                        title: item.title,
                        items: res.filter(value => value.shelf.toLowerCase() === item.id.toLowerCase())
                    }
                })
                this.setState({
                    shelves: shelvesUpdated
                })
            })
    }
    getShelves (books, shelf) {
        return books.filter(value => value.shelf.toLowerCase() === shelf.toLowerCase())
    }
    changeShelf (book, shelf) {
        BooksAPI.update(book, shelf)
            .then(res => {
                console.log(res)
            })
    }

    componentDidMount() {
        this.getData()
    }

    render () {
        // console.log('state', this.state)

        return (
            <div className="app">
                <div className="app__title">My reads app</div>
                {this.state.showSearchPage
                    ? "Search"
                    : <Shelves shelves={this.state.shelves} changeShelf={this.changeShelf} />}
                <button className="search__button" onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
        );
    }

}

export default App;
