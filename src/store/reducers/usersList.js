import ActionTypes from "../ActionTypes"

const userList = (state = {
    data: []
}, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_USERS_LIST:
            return state = { data: action.payload };
        default:
            return state;
    }
};

export default userList;