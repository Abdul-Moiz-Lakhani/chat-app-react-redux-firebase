import ActionTypes from "./../ActionTypes"

export function updateUsersList(data) {
    
    return {
        type: ActionTypes.UPDATE_USERS_LIST,
        payload: data
    }
}
