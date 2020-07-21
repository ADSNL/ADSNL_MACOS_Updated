import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {
    Row, Container, Pagination, PaginationItem, PaginationLink,
    Col, FormGroup, Form, Input
} from 'reactstrap';
import './Profile.css';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerData: [],
            firstName: ''
        };
    }

    getCustomerData = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/customer/?firstname=" + this.firstName)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({
                    customerData: data
                });
                console.log(this.state.customerData);
            })
            .catch(err => err);
    };

    handleChange = (e) => {
        this.firstName = e.target.value;
        console.log(this.firstName);
    }

    render() {
        let customer = this.state.customerData;
        return (
            <div className="container">
                <h1>Customer Profile</h1>
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
            </div>
        )
    }
}

