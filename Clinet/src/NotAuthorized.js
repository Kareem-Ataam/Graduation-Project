// UnauthorizedPage.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const UnauthorizedPage = () => {
    return (
        <div className="not-authorize">
            <h1>403 - Unauthorized</h1>
            <p>Oops! You don't have permission to access this page.</p>
            <Link to="/" className="home-link">Back to Home</Link>
        </div>
    );
};

export default UnauthorizedPage;
