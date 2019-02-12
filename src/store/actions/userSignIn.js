import firebase from "firebase/app";

import ActionTypes from "../ActionTypes";

export function signInUser(email, pass) {
  return dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then( _ => {
        dispatch(signInSuccess());
      })
      .catch(err => {
        dispatch(signInError(err));
      });
  };
}

function signInSuccess() {
  return {
    type: ActionTypes.USER_SIGN_IN_SUCCESS,
    payload: true
  };
}

function signInError(err) {
  return {
    type: ActionTypes.USER_SIGN_IN_FAILED,
    payload: { success: false, err }
  };
}
