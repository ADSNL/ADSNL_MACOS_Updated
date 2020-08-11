import React, { Component } from 'react';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
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
                this.setState({
                    customerData: data
                });
            })
            .catch(err => err);
    };

    render() {
        let customer = this.state.customerData;
        console.log(customer);
        const customerTiles = [];

        for (let i = 0; i < customer.length; i++) {
            customerTiles.push(
                <Card className="customer-details">
                    <Row>
                        <Col sm="4">
                            <CardImg top width="50" height="100%"
                                src="https://img.favpng.com/3/7/23/login-google-account-computer-icons-user-png-favpng-ZwgqcU6LVRjJucQ9udYpX00qa.jpg"
                                alt="Card image cap" />
                        </Col>
                        <Col>
                            <CardBody>
                                <CardTitle><b>Customer Name :</b> {customer[i].FName} {customer[i].LName}</CardTitle>
                                <CardTitle><b>Customer ID : </b>{customer[i].ID}</CardTitle>
                                <CardTitle><b>Gender : </b>{customer[i].Gender}</CardTitle>
                                <CardTitle><b>Date of Birth : </b> {customer[i].DOB}</CardTitle>
                                <CardTitle><b>Address : </b> {customer[i].Street} {customer[i].StreetName} Ave {customer[i].City} {customer[i].State} {customer[i].Zip}</CardTitle>
                                <Button id="order-details">Button</Button>
                            </CardBody>
                        </Col>
                    </Row>
                </Card>
            )
        }

        return (
            <div>
                <Container>
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
                </Container>

                <Container>
                    <Row>
                        {
                            (customerTiles.length == 0 || customerTiles == undefined) ? "" : customerTiles
                        }
                    </Row>
                </Container>
            </div>
        );
    }
}