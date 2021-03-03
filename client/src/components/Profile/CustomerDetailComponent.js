import React, { Component, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {
    Card, CardImg, CardText, CardBody, CardHeader,
    CardTitle, CardSubtitle, Button, CardFooter
} from 'reactstrap';

import {
    Row, Container,
    Col, FormGroup, Form, Input
} from 'reactstrap';
import './Profile.css';

export default class CustomerDetailComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerData: [],
            customerOrderData: [],
            name: '',
            firstName: '',
            lastName: ''
        };
    }

    handleChange = (e) => {
        this.name = e.target.value;
        this.name = this.name.split(" ");
        this.firstName = this.name[0];
        this.lastName = this.name[1];
    }

    getCustomerData = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/customer/?firstname=" + this.firstName + "&lastname=" + this.lastName)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log();
                this.setState({
                    customerData: data.customer_info,
                    customerOrderData: data.order_info

                });
            })
            .catch(err => err);
    };

    render() {
        let customer = this.state.customerData;
        const customerTiles = [];

        for (let i = 0; i < customer.length; i++) {
            customerTiles.push(
            <Container>
                <Card>
                    <CardHeader tag="h3">Customer Summary</CardHeader>
                    <Row>
                        <Col sm="8">
                            <div className="customer-info p-4 pl-5 pt-4">
                                <Row>
                                    <Col><p class="h4 font-weight-bold">Customer Name:</p></Col>
                                    <Col><p class="h4">{customer[i].FName} {customer[i].LName}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p class="h4 font-weight-bold">Address</p></Col>
                                    <Col><p class="h4">{customer[i].Street} {customer[i].StreetName} Ave, {customer[i].State} {customer[i].Zip}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p class="h4 font-weight-bold">City</p></Col>
                                    <Col><p class="h4">{customer[i].City}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p class="h4 font-weight-bold">Gender</p></Col>
                                    <Col><p class="h4">{customer[i].Gender}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p class="h4 font-weight-bold">Age</p></Col>
                                    <Col><p class="h4">24</p></Col>
                                </Row>
                                <Row>
                                    <Col><p class="h4 font-weight-bold">Income </p></Col>
                                    <Col><p class="h4">${customer[i].Income}</p></Col>
                                </Row>
                            </div>
                        </Col>
                        <Col>
                            <CardBody>
                                <Row>
                                    <Col><p class="h4 font-weight-bold">Date:</p></Col>
                                    <Col><p class="h4">1993/01/21</p></Col>
                                </Row>
                                <Row>
                                    <Col><p class="h4 font-weight-bold">Customer ID</p></Col>
                                    <Col><p class="h4">{customer[i].ID}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p class="h4 font-weight-bold">Education Degree Type</p></Col>
                                    <Col><p class="h4">{customer[i].Degree}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p class="h4 font-weight-bold">Martial Status</p></Col>

                                    <Col><p class="h4">{customer[i].Marital_Status_Type}</p></Col>
                                </Row>
                            </CardBody>
                        </Col>
                    </Row>
                    <CardHeader tag="h3">Payment Information</CardHeader>
                    <CardBody className="p-4 pl-5">
                        <Row>
                            <Col><p class="h4 font-weight-bold">Bank Name:</p></Col>
                            <Col><p class="h4">Bank of America</p></Col>
                        </Row>
                        <Row>
                            <Col><p class="h4 font-weight-bold">Credit Card Number</p></Col>
                            <Col><p class="h4">*************111</p></Col>
                        </Row>
                        <Row>
                            <Col><p class="h4 font-weight-bold">Credit Card Type</p></Col>
                            <Col><p class="h4">Discover</p></Col>
                        </Row>
                    </CardBody>
                    <CardHeader tag="h3">Order Details</CardHeader>
                    <CardBody className="p-4 pl-5">
                        <Row>
                            <Col><p class="h4 font-weight-bold">Order ID</p></Col>
                            <Col><p class="h4">123456789</p></Col>
                        </Row>
                        <Row>
                            <Col><p class="h4 font-weight-bold">Product SKU</p></Col>
                            <Col><p class="h4">123456789</p></Col>
                        </Row>
                        <Row>
                            <Col><p class="h4 font-weight-bold">Category Name</p></Col>
                            <Col><p class="h4">Books</p></Col>
                        </Row>
                        <Row>
                            <Col><p class="h4 font-weight-bold">Cumulative Spend</p></Col>
                            <Col><p class="h4">$1000</p></Col>
                        </Row>
                        <Row>
                            <Col><p class="h4 font-weight-bold">Order ID</p></Col>
                            <Col><p class="h4">123456789</p></Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
            )
        }
 
        return (
            <div className="customer-summary">
                <Form action="" onSubmit={this.getCustomerData} >
                    <Row>
                        <Col>
                            <FormGroup>
                                <Input type="text" name="search"
                                    placeholder="Search..."
                                    className="search-input"
                                    autoComplete="on"
                                    onChange={this.handleChange} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <Button id="searchBtn" className="search-btn btn-primary">Submit</Button>
                        </Col>
                    </Row>
                </Form>
                {
                    (customerTiles.length == 0 || customerTiles == undefined) ? "" : customerTiles
                }
            </div >
        );
    }
}