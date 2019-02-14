import ActionTypes from "../ActionTypes";

export function insertChatBox(data) {
  return {
    type: ActionTypes.INSERT_CHAT_BOX,
    payload: data
  };
}