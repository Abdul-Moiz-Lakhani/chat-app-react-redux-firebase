import firebase from "firebase/app";

import ActionTypes from "../ActionTypes";

export function sendMessage(data) {
  return dispatch => {
    firebase
      .database()
      .ref("messages")
      .push(data)
      .then(_ => {
        dispatch(sendMessageSuccess());
      })
      .catch(err => {
        dispatch(sendMessageError(err));
      });
  };
}

function sendMessageSuccess() {
  return {
    type: ActionTypes.SEND_MESSAGE_SUCCESS,
    payload: true
  };
}

function sendMessageError(err) {
  return {
    type: ActionTypes.SEND_MESSAGE_FAILED,
    payload: { success: false, err }
  };
}
