export const createTextNotice = ({ group, uid, text, profile, msgType }) => {

    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        const baseUri = `groups/${group.branch}/${group.year}/${group.div}/${uid}`
        const postkey = firebase.database().ref(`${baseUri}/messages`).push().key
        return firebase.set(
            `${baseUri}/messages/${postkey}`,
            {
                msgId: postkey,
                msg: text,
                msgType: msgType,
                receiveTimestamp: new Date().getTime(),
                sendTimestamp: new Date().toLocaleDateString()
            }
        ).then(() => {
            dispatch({ type: 'NOTICE_PUSH_SUCCESS', data: text })
            firebase.set(`${baseUri}/TeacherId`, uid)
            firebase.set(`${baseUri}/TeacherName`, profile.name)
            firebase.set(`${baseUri}/image`, profile.photo)
        }).catch((err) => {
            dispatch({ type: 'NOTICE_PUSH_ERROR', data: text })
        })

    }

}


export const createMediaNotice = ({ group, uid, file, profile, msgType }) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        const baseUriForStorage = `chat/${profile.name}/${group.year}-${group.branch}-${group.div}/${file.name}` //base uri for storage


        return firebase.storage().ref(baseUriForStorage).put(file)
            .then(snap => {
                //file uploaded now create text notice for the same
                console.log('file uploaded heading to text')
                return dispatch(createTextNotice({ group, uid, text: file.name, profile, msgType }))
            })
            .catch(err => {
                dispatch({ type: 'NOTICE_PUSH_ERROR', data: file.name })
            })
    }
}



export const createRichNotice = ({ group, uid, jsonString, profile, msgType }) => {

    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        const baseUri = `groups/${group.branch}/${group.year}/${group.div}/${uid}`
        const postkey = firebase.database().ref(`${baseUri}/messages`).push().key
        return firebase.set(
            `${baseUri}/messages/${postkey}`,
            {
                msgId: postkey,
                msg: jsonString,
                msgType: msgType,
                receiveTimestamp: new Date().getTime(),
                sendTimestamp: new Date().toLocaleDateString()
            }
        ).then(() => {
            dispatch({ type: 'NOTICE_PUSH_SUCCESS', data: 'type: Rich Text' })
            firebase.set(`${baseUri}/TeacherId`, uid)
            firebase.set(`${baseUri}/TeacherName`, profile.name)
            firebase.set(`${baseUri}/image`, profile.photo)
        }).catch((err) => {
            dispatch({ type: 'NOTICE_PUSH_ERROR', data: 'type: Rich Text' })
        })

    }

}


export const clearNoticeData = () => {
    return (dispatch) => { dispatch({ type: 'CLEAR_NOTICE_DATA' }) }
}