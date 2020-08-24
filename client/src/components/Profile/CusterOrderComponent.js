import React, { useState } from 'react';

export default function CusterOrderComponent({ match }) {

    const [customerOrderData] = useState(match.params.id);
    getCustomerOrderData();
    function getCustomerOrderData() {
        console.log("getting customer order data." + customerOrderData);
    }

    return (
        <div>
            <h3>ID : {match.params.id}</h3>
        </div>
    )
}
