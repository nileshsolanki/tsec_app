import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-materialize'
import { connect } from 'react-redux'

function Landing({ auth, profile }) {

    const styleBottom = {
        position: 'fixed',
        bottom: '0'
    }

    const containStyle = {
        margin: '4%',
        padding: '40px',
        borderRadius: '10px'
    }

    console.log('profile', profile)

    return (
        <div>
            <h4 style={{ paddingLeft: '20px' }}>Hi !</h4>
            <div className="row">
                <div className="col s12 m5">
                    <img className="responsive-img" src="https://assets-ouch.icons8.com/preview/959/94ded397-fd13-4b9c-9e6d-5ab45154d716.png" alt="" />
                </div>
                <div className="col s12 m6 grey lighten-4" style={containStyle}>
                    <p className="flow-text">Get started...</p>
                    {profile.type === 'teacher' && <Link to="/create"><Button waves="light" className="indigo lighten-1">create</Button></Link>}
                    {!auth.uid && <Link to="/signin"> <Button waves="light" className="indigo darken-3">sign in</Button></Link>}
                    {<Link to="/notifications"> <Button waves="light" className="indigo ">circulars</Button></Link>}
                    {auth.uid && <Link to="/chats"> <Button waves="light" className="indigo darken-3">notices</Button></Link>}
                    {auth.uid && <Link to="/library"> <Button waves="light" className="indigo darken-4">library</Button></Link>}
                </div>
            </div>
            <Link to="/" style={styleBottom}><Button waves="light" className="indigo lighten-4 grey-text text-darken-4 z-depth-0">Contact Us</Button></Link>
        </div>
    )
}



const mapStateToProps = (state) => {
    return ({
        auth: state.firebase.auth,
        profile: state.firebase.profile
    })
}

export default connect(mapStateToProps)(Landing)
