

export const downloadFile = ({ teacherId, fileName }) => {
    return (dispatch, getState, { getFirebase }) => {

        const { profile } = getState().firebase
        const firebase = getFirebase()


        firebase.database().ref(`users/${teacherId}/name`).once('value')
            .then(snapshot => {
                const name = snapshot.node_.value_
                const folderName = profile.year + '-' + profile.branch + '-' + profile.class
                // console.log('folderName', folderName)
                const storageRef = firebase.storage().ref(`chat/${name}/${folderName}`).child(`${fileName}`)
                storageRef.updateMetadata({
                    "contentDisposition": `attachment; filename=${fileName}`
                }).then(res => {
                    console.log('metadata', res)
                    return storageRef.getDownloadURL()
                        .then(url => {
                            dispatch({ type: 'DOWNLOADING_FILE_SUCCESS', url })
                            // saveAs(url, fileName)
                            downloadFromUrl(url)
                        })
                        .catch(err => {
                            dispatch({ type: 'ERROR_DOWNLOADING_FILE', err })
                        })
                })



            }).catch(err => {
                dispatch({ type: 'ERROR_DOWNLOADING_FILE', err })
            })
    }
}


export const downloadFromLink = (url) => {
    return (dispatch, getState, { getFirebase }) => {

        const firebase = getFirebase()
        const storageRef = firebase.storage().refFromURL(url)
        storageRef.updateMetadata({
            "contentDisposition": "attachment"
        }).then(metadata => {

            console.log('metadata', metadata)
            downloadFromUrl(url)
            dispatch({ type: 'DOWNLOADING_FILE_SUCCESS', url })

        }).catch(err => {

            console.log(err)
            dispatch({ type: 'ERROR_DOWNLOADING_FILE', err })

        })

    }
}


function downloadFromUrl(absoluteUrl) {
    var link = document.createElement('a');
    link.href = absoluteUrl;
    link.download = 'true';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove()
}




