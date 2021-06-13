import React from "react";
import './App.sass';
import * as BooksAPI from './BooksAPI';
import Shelves from "./components/Shelves";
import Search from "./components/Search";

class App extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        search: [],
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
        ],
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
            })
    }

    searchBooks = async (str) => {
        BooksAPI.search(str)
            .then(res => {
                if (!str) {
                    return this.setState({
                        search: []
                    })
                }
                if (res) {
                    this.setState({
                        search: res
                    })
                }
            })
    }

    clearSearch = () => {
        this.setState({
            search: []
        })
    }

    componentDidMount() {
        this.getData()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state) {
            this.getData()
        }
    }

    render () {
        return (
            <div className="app">
                <div className="app__title">My reads app</div>
                {this.state.showSearchPage
                    ? <Search searchBooks={this.searchBooks} clearSearch={this.clearSearch} books={this.state.search} changeShelf={this.changeShelf} shelves={this.state.shelves} />
                    : <Shelves shelves={this.state.shelves} changeShelf={this.changeShelf} />}
                <button className="search__button" onClick={() => this.setState({ showSearchPage: !this.state.showSearchPage })}>Add a book</button>
            </div>
        );
    }

}

export default App;
