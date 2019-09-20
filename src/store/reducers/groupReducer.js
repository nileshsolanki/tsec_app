const initState = {
    groupCreateError: null,
    data: null
}

const groupReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GROUP_CREATE_SUCCESS':
            return {
                ...state,
                groupCreateError: null,
                data: action.snap
            }

        case 'GROUP_CREATE_ERROR':
            return {
                ...state,
                groupCreateError: action.err,
                data: null
            }

        default:
            return state
    }
}


export default groupReducer