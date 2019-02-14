import ActionTypes from "../ActionTypes";

export function clearChatBoxes(data) {
  return {
    type: ActionTypes.CLEAR_CHAT_BOXES,
    payload: data
  };
}