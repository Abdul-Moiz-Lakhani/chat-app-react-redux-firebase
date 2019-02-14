import ActionTypes from "../ActionTypes";

export function closeChatBox(id) {
  return {
    type: ActionTypes.CLOSE_CHAT_BOX,
    payload: id
  };
}