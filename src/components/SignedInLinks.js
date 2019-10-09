import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button, Navbar } from 'react-materialize'

const SignedInLinks = (props) => {

    const { profile, signout } = props
    const shortname = (Boolean(profile.name) && profile.name.split(" ")) || ("! !")

    return (


        <Navbar fixed className="primaryColor logo-left" alignLinks="right" brand={<Link to="/"><h5>TSEC App</h5>></Link>} >
            <NavLink to="/notifications">Circulars</NavLink>
            <NavLink to="/library">Library</NavLink>
            <NavLink to="/chats">Notices</NavLink>
            <NavLink to="/">Saved Notes</NavLink>
            {profile.type === 'teacher' && <NavLink to="/create">Create</NavLink>}
            <NavLink to="/" onClick={signout}>Sign Out</NavLink>
            <NavLink to="/"><Button floating className="red" waves="light">{shortname[0][0]} {shortname[1][0]}</Button></NavLink>
            <a className="black" href="https://github.com/nileshsolanki/tsec_app">
                <img style={{ margin: 'auto', verticalAlign: 'middle' }} src={process.env.PUBLIC_URL + "/github.png"} height="85%" alt="GitHub" />
            </a>
        </Navbar>
    )
}

export default SignedInLinks
