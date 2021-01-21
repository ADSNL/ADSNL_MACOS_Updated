import React, { Component } from 'react';
import { Link, withRouter, Route } from 'react-router-dom';
import './Navbar.css';
import Routes from './routing/Routes';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigationLinks: []
        }
    }

    getNavigationLinks = () => {
        fetch("http://localhost:5000/api/navlinks")
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({
                    navigationLinks: data
                });
            })
            .catch(err => err);
    }

    logout(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/login`)
    }

    componentDidMount() {
        this.getNavigationLinks();
    }

    render() {
        const data = this.state.navigationLinks;
        var loginRegLink;
        var userLink;
        if (data.length !== 0) {
            loginRegLink = (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">ADSNL</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/' + data[0].Dept_Name} className="nav-link">{data[0].Dept_Name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/clothing" className="nav-link">{data[1].Dept_Name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/movies" className="nav-link">{data[2].Dept_Name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/kitchen" className="nav-link">{data[3].Dept_Name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/makeup" className="nav-link">{data[4].Dept_Name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/pets" className="nav-link">{data[5].Dept_Name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">Register</Link>
                    </li>
                </ul >
            )
            userLink = (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">ADSNL</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/books" className="nav-link">{data[0].Dept_Name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/clothing" className="nav-link">{data[1].Dept_Name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/movies" className="nav-link">{data[2].Dept_Name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/kitchen" className="nav-link">{data[3].Dept_Name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/makeup" className="nav-link">{data[4].Dept_Name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/pets" className="nav-link">{data[5].Dept_Name}</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <a href="" onClick={this.logout.bind(this)} className="nav-link login-nav">Logout</a>
                    </li>
                </ul>
            )
        }
        else {
            <p></p>
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarsExample10"
                        aria-controls="navbarsExample10"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample10">
                        {localStorage.usertoken ? userLink : loginRegLink}
                    </div>
                </nav>
                <Route component={Routes} />
            </div>
        )
    }
}

export default withRouter(Navbar)