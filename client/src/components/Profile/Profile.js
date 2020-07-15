import React, { Component } from 'react'
import './Profile.css';
import CustomerDetail from './CustomerDetail';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerData: []
        };
    }

    getCustomerData = async () => {
        await fetch("http://localhost:5000/api/customer")
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

    componentDidMount() {
        this.getCustomerData();
    }

    render() {
        let customer = this.state.customerData;
        return (
            <div className="container">
                {/* <CustomerDetail customer={this.state.customerData} /> */}
                <Card className="main-content">
                    <CardImg top width="100%" className="card-img"
                        src="https://www.pinclipart.com/picdir/middle/181-1814767_person-svg-png-icon-free-download-profile-icon.png"
                        alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{this.state.customerData.Customer_ID}</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

