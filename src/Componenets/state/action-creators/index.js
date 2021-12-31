export const addUser = (user) => {
    return (dispatch) => {
        dispatch({
            type: 'addUser',
            payload: user
        })
    }
}