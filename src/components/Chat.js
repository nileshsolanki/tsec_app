import React, { Component } from 'react'
import { CollectionItem } from 'react-materialize'

class Chat extends Component {
    render() {

        console.log(this.props)
        const { image, TeacherName } = this.props.groupData

        return (
            <CollectionItem className="avatar hoverable">
                <img src={image} alt="" className="circle small" />
                <span>{TeacherName}</span>
            </CollectionItem>
        )
    }
}

export default Chat