export const addBook = (bookData) => {
    return (dispatch, getState, { getFirebase }) => {
        const { auth } = getState().firebase
        const { bookName, issueDate, bookId } = bookData
        const refernce = issueDate + getCleanedName(bookName)
        const firebase = getFirebase()
        firebase.set(`library/${auth.uid}/${refernce}`,
            {
                bookId: bookId,
                issueDate: issueDate,
                bookName: bookName
            })
            .then(ref => {
                dispatch({ type: 'BOOK_ADD_SUCCESSFUL', bookData })
            })
            .catch(err => {
                dispatch({ type: 'BOOK_ADD_ERROR', err })
            })
    }
}


export const removeBook = (refId) => {
    return (dispatch, getState, { getFirebase }) => {
        const { auth } = getState().firebase
        const firebase = getFirebase()
        firebase.remove(`library/${auth.uid}/${refId}`)
            .then(ref => {
                dispatch({ type: 'BOOK_REMOVE_SUCCESS', refId })
            })
            .catch(err => {
                dispatch({ type: 'BOOK_REMOVE_ERROR', err })
            })


    }
}


export const getCleanedName = (bookName) => {
    return bookName.replace(/[\s`~!@#$%^&*_|+\-=?;:'",.<>{}[]\\\/]/gi, '')
}