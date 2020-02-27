import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

export default class BaseLayout extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="content">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}