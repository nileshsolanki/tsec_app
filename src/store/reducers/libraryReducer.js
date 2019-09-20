const initState = {
    bookAddErr: null,
    bookRemErr: null
}

const libraryReducer = (state = initState, action) => {
    switch (action.type) {
        case 'BOOK_ADD_SUCCESSFUL':
            console.log('book add success')
            return {
                ...state,
                bookAddErr: null
            }

        case 'BOOK_ADD_ERROR':
            console.log('book add error', action.err)

            return {
                ...state,
                bookAddErr: 'Error adding new book'
            }

        case 'BOOK_REMOVE_SUCCESS':
            console.log('book remove success')
            return {
                ...state,
                bookRemErr: null
            }

        case 'BOOK_REMOVE_ERROR':
            console.log('book remove fail')
            return {
                ...state,
                bookRemErr: 'Error removing book'
            }

        default:
            return state

    }
}

export default libraryReducer