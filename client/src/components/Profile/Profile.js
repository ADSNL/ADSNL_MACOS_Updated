import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {
    Card, CardText, Row, Col,
    CardTitle
} from 'reactstrap';

import CustomerDetailComponent from './CustomerDetailComponent';
import CustomerOrderDetailComponent from './CustomerOrderDetailComponent';
import './Profile.css';

export default function Profile() {
    return (
        <Router>
            {/* <div className="container"> */}
            <nav>
                <ul>
                    <Row>
                        <Col>
                            <li>
                                <Link to="/orders">
                                    <Card body outline color="secondary" className="profile-cards">
                                        <CardTitle className="card-title">Your Orders</CardTitle>
                                        <CardText>Track, return, or buy things again</CardText>
                                    </Card>
                                </Link>
                            </li>
                        </Col>
                        <Col>
                            <li>
                                <Link to="/customer-details">
                                    <Card body outline color="secondary" className="profile-cards">
                                        <CardTitle className="card-title">Customer Details</CardTitle>
                                        <CardText>Edit login, name, and mobile number</CardText>
                                    </Card>
                                </Link>
                            </li>
                        </Col>
                        <Col>
                            <li>
                                <Link to="/adresses">
                                    <Card body outline color="secondary" className="profile-cards">
                                        <CardTitle className="card-title">Your Addresses</CardTitle>
                                        <CardText>Edit addresses for orders and gifts</CardText>
                                    </Card>
                                </Link>
                            </li>
                        </Col>
                    </Row>
                </ul>
            </nav>

            <Switch>
                <Route exact path="/orders">
                    <CustomerOrder />
                </Route>
                <Route exact path="/customer-details">
                    <CustomerDetails />
                </Route>
                <Route exact path="/adresses">
                    <CustomerAdress />
                </Route>
            </Switch>
            {/* </div> */}
        </Router>
    )

    function CustomerOrder() {
        return <CustomerOrderDetailComponent />;
    }

    function CustomerDetails() {
        return <CustomerDetailComponent />;
    }

    function CustomerAdress() {
        return <h1>Address</h1>;
    }
}