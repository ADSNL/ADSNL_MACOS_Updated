import React, { Component } from 'react'

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
        return (
            <div>

            </div>
        )
    }
}
