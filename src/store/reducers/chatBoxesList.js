import ActionTypes from "../ActionTypes"

const chatBoxesList = (state = {
    data: {}
}, action) => {
    switch (action.type) {
        case ActionTypes.INSERT_CHAT_BOX:
            return state = { data: {...state.data, [action.payload.userUid]: action.payload} };
        case ActionTypes.CLOSE_CHAT_BOX:
            let a = action.payload;
            return state = { data: {...a}};
        case ActionTypes.CLEAR_CHAT_BOXES:
            return state = { data: action.payload};
        default:
            return state;
    }
};

export default chatBoxesList;