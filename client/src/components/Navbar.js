import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
    logout(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/login`)
    }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav login-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="" onClick={this.logout.bind(this)} className="nav-link login-nav">Logout</a>
                </li>
            </ul>
        )

        return (
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
        )
    }
}

export default withRouter(Navbar)