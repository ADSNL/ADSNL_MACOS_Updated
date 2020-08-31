import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';

export default class CustomerOrderDetailComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerOrderData: []
        }
    }

    componentDidMount() {
        this.getCustomerOrderData();
    }

    getCustomerOrderData = async () => {
        await fetch("http://localhost:5000/api/customer/order")
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({
                    customerOrderData: data
                });
            })
            .catch(err => err);
    };

    render() {
        let order = this.state.customerOrderData;
        const order_tiles = [];
        const order_heading = [];

        order_heading.push(
            <Row>
                <Col>Customer ID</Col>
                <Col>First Name</Col>
                <Col>Last Name</Col>
                <Col>City</Col>
                <Col>Order ID</Col>
                <Col>Order Date</Col>
                <Col>Time</Col>
            </Row>
        );

        for (let i = 0; i < order.length; i++) {
            order_tiles.push(
                <Row key={i}>
                    <Col>{order[i].ID}</Col>
                    <Col>{order[i].First_Name}</Col>
                    <Col>{order[i].Last_Name}</Col>
                    <Col>{order[i].City}</Col>
                    <Col>{order[i].Order_ID}</Col>
                    <Col>{order[i].Order_Date}</Col>
                    <Col>{order[i].Time}</Col>
                </Row>
            );
        }

        return (
            <Container className="themed-container" fluid={true}>
                {order_heading}
                {
                    (order_tiles.length === 0 || order_tiles == undefined ? (<h2>Loading...</h2>) : order_tiles)
                }
            </Container>
        )
    }
}
