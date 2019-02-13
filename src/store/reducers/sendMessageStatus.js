import ActionTypes from "../ActionTypes"

const sendMessageStatus = (state = {
    success: false,
    error: ""
}, action) => {
    switch (action.type) {
        case ActionTypes.SEND_MESSAGE_SUCCESS:
            return state = { success: action.payload };
        case ActionTypes.SEND_MESSAGE_FAILED:
            return state = { success: action.payload.success, error: action.payload.err };
        default:
            return state;
    }
};

export default sendMessageStatus;