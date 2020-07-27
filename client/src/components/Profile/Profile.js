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
                console.log(this.state.customerData);
            })
            .catch(err => err);
    };

    render() {
        let customer = this.state.customerData;
        return (
            <div className="container">
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

