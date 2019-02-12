import firebase from "firebase/app";

import ActionTypes from "./../ActionTypes";

export function makeNewUser(name, email, pass) {
  return dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(snap => {
        let userUid = snap.user.uid;
        let userName = name;
        let userEmail = snap.user.email;
        let isActive = false;

        let userData = { userUid, userName, userEmail, isActive };

        firebase
          .database()
          .ref(`users/${userUid}`)
          .set(userData)
          .then(() => {
            dispatch(signUpSuccess());
          })
          .catch(err => {
            dispatch(signUpError(err));
          });
      })
      .catch(err => {
        dispatch(signUpError(err));
      });
  };
}

function signUpSuccess() {
  return {
    type: ActionTypes.USER_SIGN_UP_SUCCESS,
    payload: true
  };
}

function signUpError(err) {
  return {
    type: ActionTypes.USER_SIGN_UP_FAILED,
    payload: { success: false, err }
  };
}
