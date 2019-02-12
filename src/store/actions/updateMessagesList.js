import ActionTypes from "./../ActionTypes"

export function updateMessagesList(data) {
    
    return {
        type: ActionTypes.UPDATE_MESSAGES_LIST,
        payload: data
    }
}
