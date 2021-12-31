const initialState = {
    user: null
}

const reducer = (state = initialState, action) => {
    if (action.type === 'addUser') {
        return {
            ...state, user: action.payload
     }
    }
    else return state
}

export default reducer;