export const createGroup = ({ group, uid }) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        const baseUri = `/users/${uid}/classgroups`

        let newGroup
        if (group.year === 'FE') {
            newGroup = {
                groupName: `${group.year}-${group.div}`,
                div: group.div,
                year: group.year,
                branch: "na"
            }
        }
        else if (group.branch === 'Computer' || group.branch === 'IT') {
            newGroup = {
                groupName: `${group.year}-${group.branch}-${group.div}`,
                year: group.year,
                div: group.div,
                branch: group.branch
            }
        }
        else {
            newGroup = {
                groupName: `${group.year}-${group.branch}`,
                year: group.year,
                branch: group.branch,
                div: "na"
            }
        }

        //get a key for firebase node before hand
        //we want to include this key in our body
        const groupKey = firebase.database().ref(baseUri).push().key
        return firebase.set(`${baseUri}/${groupKey}`,
            {
                ...newGroup,
                groupId: groupKey,

            }).then(snap => {
                dispatch({ type: 'GROUP_CREATE_SUCCESS', snap })
            }).catch(err => {
                dispatch({ type: 'GROUP_CREATE_ERROR', err })
            })

    }

}