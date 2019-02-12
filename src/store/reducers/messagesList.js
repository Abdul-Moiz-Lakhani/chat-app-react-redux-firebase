import ActionTypes from "../ActionTypes"

const messagesList = (state = {
    data: []
}, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_MESSAGES_LIST:
            return state = { data: action.payload };
        default:
            return state;
    }
};

export default messagesList;