import React, { Component } from 'react'
import NotificationList from './NotificationList';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Conversation extends Component {
    render() {

        const { auth } = this.props
        if (!auth.uid) return (<Redirect to="/" />)
        const { messages, teacherName } = this.props

        return (
            <div>
                <h5 className="container section">{teacherName}</h5>
                <NotificationList type="private" messages={messages} teacherId={this.props.match.params.id} />
            </div>
        )
    }
}


const mapStateToProps = (state, ownprops) => {
    const teacherId = ownprops.match.params.id
    const { profile } = state.firebase
    const { groups } = state.firebase.data

    let group = null
    if (groups && profile) group = groups[profile.branch][profile.year][profile.class][teacherId]

    let messages = null
    if (group) {
        messages = group.messages
        if (!Array.isArray(messages)) {
            const tempMessages = Object.keys(messages).map(key => { return { key: key, value: messages[key] } })
            messages = tempMessages
        }

    }

    return ({
        auth: state.firebase.auth,
        profile: profile,
        messages: messages,
        teacherName: (group) ? group.TeacherName : ""
    })
}

export default connect(mapStateToProps)(Conversation)