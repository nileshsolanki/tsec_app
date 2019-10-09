import React, { Component } from 'react'
import { TextInput, Button, CardPanel } from 'react-materialize'
import { signin } from './../store/actions/authActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import M from 'materialize-css'

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // console.log('state', this.state)
        this.props.signin(this.state)
    }

    handleChange = (e) => {
        this.setState(

            { [e.target.id]: e.target.value }
        )

    }

    render() {

        const { auth } = this.props
        if (auth.uid) return (<Redirect to="/" />)

        return (
            <div className="container">
                <br /><br />
                <CardPanel >
                    <form>
                        <h6 className="section">Sign In</h6>
                        <TextInput email validate id="email" label="Email" onChange={this.handleChange} />
                        <TextInput password id="password" label="Password" onChange={this.handleChange} />
                        <Button waves="light" onClick={this.handleSubmit}>Sign In</Button>
                    </form>
                </CardPanel>

            </div>
        )
    }
}



const mapStateToProps = (state) => {
    // console.log(state)

    state.auth.authError && M.toast({ html: 'Login Failed' })

    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signin: (cred) => { dispatch(signin(cred)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
