import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Navbar } from 'react-materialize'

const SignedOutLinks = () => {

    return (
        <Navbar fixed className="primaryColor logo-left" alignLinks="right" brand={<Link to="/">TSEC App</Link>}>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/notifications">Circulars</NavLink>
        </Navbar>
    )
}

export default SignedOutLinks
