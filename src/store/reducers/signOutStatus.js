import ActionTypes from "../ActionTypes"

const signOutStatus = (state = {
    success: false,
    error: ""
}, action) => {
    switch (action.type) {
        case ActionTypes.USER_SIGN_OUT_SUCCESS:
            return state = { success: action.payload };
        case ActionTypes.USER_SIGN_OUT_FAILED:
            return state = { success: action.payload.success, error: action.payload.err };
        default:
            return state;
    }
};

export default signOutStatus;