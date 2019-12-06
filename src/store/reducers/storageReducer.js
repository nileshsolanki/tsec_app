const initState = {
    url: null
}


const storageReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ERROR_DOWNLOADING_FILE':
            console.log('error fetching url')
            console.log('message', action.err)
            return {
                ...state,
                url: null
            }

        case 'DOWNLOADING_FILE_SUCCESS':
            console.log('url fetch success')
            return {
                ...state,
                url: action.url
            }

        default:
            return state
    }
}


export default storageReducer