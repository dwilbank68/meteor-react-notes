import React, { PropTypes } from 'react';
import {Link} from 'react-router';
const NotFound = (props) => {

    return (
        <div className="not-found boxed-view">
            <div className="boxed-view__box">
                <h1>Page Not Found</h1>
                <p>We're unable to find that page</p>
                <Link   to="/"
                        className='button button--link'>
                    HEAD HOME
                </Link>
            </div>
        </div>
    );
};

export default NotFound;