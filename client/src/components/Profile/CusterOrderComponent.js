import React, { useState, useEffect } from 'react';

export default function CusterOrderComponent({ match }) {

    const [customerOrderData, setCustomerOrderData] = useState([]);
    GetCustomerOrderData();

    async function GetCustomerOrderData() {
        await useEffect(() => {
            fetch(`http://localhost:5000/api/customer-details/${match.params.id}`)
                .then(res => res.json())
                .then(res => {
                    setCustomerOrderData(res)
                })
                .catch(err => {
                    console.log(err);
                });
            console.log(customerOrderData);

        })
    }

    return (
        <div>
            <h3>ID : {match.params.id}</h3>
        </div>
    )
}
