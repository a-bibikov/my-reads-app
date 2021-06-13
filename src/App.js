import React from "react";
import './App.sass';
import * as BooksAPI from './BooksAPI';
import Shelves from "./components/Shelves";
import Search from "./components/Search";
import {Route} from 'react-router-dom';

class App extends React.Component {
    state = {
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
    }

    searchBooks = async (str) => {
        if (str.length > 2) {
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
                <Route path="/search">
                    <Search searchBooks={this.searchBooks} clearSearch={this.clearSearch} books={this.state.search} changeShelf={this.changeShelf} shelves={this.state.shelves} />
                </Route>
                <Route path="/" exact>
                    <Shelves shelves={this.state.shelves} changeShelf={this.changeShelf} />
                </Route>
            </div>
        );
    }

}

export default App;
