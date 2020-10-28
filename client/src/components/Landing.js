// import React, { Component } from 'react';

// class Landing extends Component {
//     render() {
//         return (
//             <div className="contianer">
//                 <div className="jumbotron mt-5">
//                     <div className="col-sm-8 mx-auto">
//                         <h1 className="text-center">
//                             Welcome
//                         </h1>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

import React, { Component } from "react";
// import "../App.css";
import Footer from './BaseLayout/Footer/Footer';
import LandingPage from './LandingPage/Landing';
import {
    BrowserRouter,
    Route,
    Link
} from "react-router-dom";

import Routes from './routing/Routes'

import {
    Collapse,
    Navbar as NavbarB, //Navbar from bootstrap
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import './BaseLayout/Navbar/Navbar.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            clothing: [],
            movies: []
        };
    }

    getBooks = async () => {
        fetch("http://localhost:5000/api/books")
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({
                    books: data
                });
            })
            .catch(err => err);
    };

    getClothing = async () => {
        fetch("http://localhost:5000/api/clothing")
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({
                    clothing: data
                });
            })
            .catch(err => err);
    };
    getMovies = async () => {
        fetch("http://localhost:5000/api/moviesdetails")
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({
                    movies: data
                });
            })
            .catch(err => err);
    };

    componentDidMount() {
        this.getBooks();
        this.getClothing();
        this.getMovies();
    }

    render() {
        const datas = this.state.books;
        { console.log(datas.length) }
        const clothingData = this.state.clothing;
        const moviesData = this.state.movies;
        const datasList = datas.length && clothingData.length && moviesData.length ? (
            <div>
                <BrowserRouter>
                    <Route exact path="/">
                        <LandingPage data={datas} clothing={clothingData} movies={moviesData} />
                    </Route>
                    {/* <Route component={Routes} /> */}
                </BrowserRouter>
                <Footer style={{ marginTop: '500px' }} />
            </div>
        ) : (
                <h1>Loading</h1>
            );

        return (
            <div>
                {datasList}
            </div>
        )
    }
}

export default Landing