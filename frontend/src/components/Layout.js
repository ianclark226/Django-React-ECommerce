import React, { Fragment } from 'react';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';

const Layout = ({ title, content, children }) => {
    return (
        <Fragment>
            <Helmet>
                <title>Mini Shop | {title} </title>
                <meta name="description" content={content} />
                </Helmet>
            <Navbar />
            <div className="container">
                {children}
            </div>
        </Fragment>
    )
}

export default Layout;