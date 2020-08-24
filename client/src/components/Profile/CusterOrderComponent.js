import React, { useState } from 'react';

export default function CusterOrderComponent({ match }) {

    const [customerOrderData] = useState({});
    getCustomerOrderData();

    async function getCustomerOrderData() {
        console.log("getting customer order data." + customerOrderData);
        await fetch(`http://localhost:5000/api/customer-details/${match.params.id}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({
                    customerOrderData: data
                });
            })
            .catch(err => err);
    }

    return (
        <div>
            <h3>ID : {match.params.id}</h3>
        </div>
    )
}
