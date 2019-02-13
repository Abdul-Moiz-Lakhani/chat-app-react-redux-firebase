import firebase from "firebase/app";

import ActionTypes from "../ActionTypes";

export function signOutUser(id) {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(_ => {
        firebase
          .database()
          .ref(`users/${id}/isActive`)
          .set(false)
          .then(_ => {
            dispatch(signOutSuccess());
          });
      })
      .catch(err => {
        dispatch(signOutError(err));
      });
  };
}

function signOutSuccess() {
  return {
    type: ActionTypes.USER_SIGN_OUT_SUCCESS,
    payload: true
  };
}

function signOutError(err) {
  return {
    type: ActionTypes.USER_SIGN_OUT_FAILED,
    payload: { success: false, err }
  };
}
