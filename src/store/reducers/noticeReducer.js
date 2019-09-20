const initState = {
    noticePushError: null,
    noticePushData: null
}


const noticeReducer = (state = initState, action) => {

    switch (action.type) {
        case 'NOTICE_PUSH_SUCCESS':
            console.log('notice push success')
            return {
                ...state,
                noticePushError: null,
                noticePushData: action.data
            }

        case 'NOTICE_PUSH_ERROR':
            console.log('notice push error')
            return {
                ...state,
                noticePushError: 'error pushing notice',
                noticePushData: action.data
            }

        case 'CLEAR_NOTICE_DATA':
            console.log('notice data cleared')
            return {
                ...state,
                noticePushData: null
            }

        default:
            return state

    }
}


export default noticeReducer