import ActionTypes from "./../ActionTypes"

export function updateCurrentUser(data) {
    
    return {
        type: ActionTypes.UPDATE_CURRENT_USER,
        payload: data
    }
}
