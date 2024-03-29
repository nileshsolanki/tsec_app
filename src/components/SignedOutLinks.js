import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Navbar } from 'react-materialize'

const SignedOutLinks = () => {

    return (
        <Navbar fixed className="primaryColor logo-left" alignLinks="right" brand={<Link to="/">TSEC App</Link>}>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/notifications">Circulars</NavLink>
            <a className="black" href="https://github.com/nileshsolanki/tsec_app">
                <img style={{ margin: 'auto', verticalAlign: 'middle' }} src={process.env.PUBLIC_URL + "/github.png"} height="85%" alt="GitHub" />
            </a>
        </Navbar>
    )
}

export default SignedOutLinks
