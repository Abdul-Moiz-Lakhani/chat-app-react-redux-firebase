import ActionTypes from "../ActionTypes"

const signInStatus = (state = {
    success: false,
    error: ""
}, action) => {
    switch (action.type) {
        case ActionTypes.USER_SIGN_IN_SUCCESS:
            return state = { success: action.payload };
        case ActionTypes.USER_SIGN_IN_FAILED:
            return state = { success: action.payload.success, error: action.payload.err };
        default:
            return state;
    }
};

export default signInStatus;