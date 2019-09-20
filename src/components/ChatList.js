import React, { Component } from 'react'
import { Collection } from 'react-materialize'
import Chat from './Chat'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

class ChatList extends Component {
    render() {

        const { auth, groups } = this.props
        if (!auth.uid) return (<Redirect to="/" />)

        return (
            <div className="container">
                <h6 className="section">Notices</h6>
                <Collection>
                    {console.log("groups", groups)}
                    {Array.isArray(groups) && groups.map(group => <Link to={`/chat/${group.key}`} key={group.key} ><Chat groupData={group.value} /></Link>)}
                </Collection>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const { profile, auth } = state.firebase
    const { groups } = state.firebase.ordered


    return ({
        auth: auth,
        profile: auth ? profile : null,
        groups: (groups && profile) ? state.firebase.ordered.groups[profile.branch][profile.year][profile.class] : null
    })
}

export default compose(
    connect(mapStateToProps),
    firebaseConnect(state => {
        const profile = state.profile
        const fetchUri = profile ? `/groups/${profile.branch}/${profile.year}/${profile.class}` : null

        return ([
            { path: fetchUri }
        ])
    }),
)(ChatList)


