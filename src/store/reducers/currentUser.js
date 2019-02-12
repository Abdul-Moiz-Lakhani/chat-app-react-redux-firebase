import ActionTypes from "../ActionTypes"

const currentUser = (state = {
    data: {}
}, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_CURRENT_USER:
            return state = { data: action.payload };
        default:
            return state;
    }
};

export default currentUser;