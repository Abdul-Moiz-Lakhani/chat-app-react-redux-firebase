import ActionTypes from "../ActionTypes"

const signUpStatus = (state = {
    success: false,
    error: ""
}, action) => {
    switch (action.type) {
        case ActionTypes.USER_SIGN_UP_SUCCESS:
            return state = { success: action.payload };
        case ActionTypes.USER_SIGN_UP_FAILED:
            return state = { success: action.payload.success, error: action.payload.err };
        default:
            return state;
    }
};

export default signUpStatus;