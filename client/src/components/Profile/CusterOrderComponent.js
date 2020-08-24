import React, { useState } from 'react';

export default function CusterOrderComponent({ match }) {
    return (
        <div>
            <h3>ID : {match.params.id}</h3>
        </div>
    )
}
