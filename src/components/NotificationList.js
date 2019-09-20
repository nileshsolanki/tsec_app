import React, { Component } from 'react'
import { Collapsible } from 'react-materialize'
import Notification from './Notification'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

class NotificationList extends Component {

    render() {
        // console.log('props', this.props)
        const { notices, messages, type, teacherId } = this.props

        return (
            <div className="container">
                <h6 className="section">Notifications</h6>
                <Collapsible popout>
                    {!type && notices && notices.map(notice => <Notification data={notice.value} type="public" key={notice.key} />)}
                    {type && Array.isArray(messages) && messages.map(message => <Notification data={message.value} teacherId={teacherId} type={type} key={message.key} />)}
                </Collapsible>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    // console.log("state", state)
    return ({
        notices: state.firebase.ordered.notification || [],
        profile: state.firebase.profile
    })
}

export default compose(
    connect(mapStateToProps),
    firebaseConnect((ownprops) => {
        const { type, messages, profile, teacherId } = ownprops
        if (type && !messages) {
            const fetchUri = `/groups/${profile.branch}/${profile.year}/${profile.class}/${teacherId}`
            return ([
                { path: `${fetchUri}/messages`, orderBy: ['sendTimestamp', 'desc'] }
            ])
        }
        return ([
            { path: '/notification' }
        ])
    })
)(NotificationList)