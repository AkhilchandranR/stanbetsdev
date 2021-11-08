import React from 'react';
import './RestrictedScreen.css';

function RestrictedScreen({country}) {
    return (
        <div className="restricted__screen">
            <div className="restricted__header">
                <h2>Stanbets</h2>
            </div>
            <div className="restricted__body">
                <h3>Users from {country} currently aren't allowed to access Stanbets.</h3>
            </div>
        </div>
    )
}

export default RestrictedScreen
