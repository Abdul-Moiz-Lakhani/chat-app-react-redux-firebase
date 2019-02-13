import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import currentUser from "./reducers/currentUser";
import usersList from "./reducers/usersList";
import messagesList from "./reducers/messagesList";
import signUpStatus from "./reducers/signUpStatus";
import signInStatus from "./reducers/signInStatus";
import signOutStatus from "./reducers/signOutStatus";
import sendMessageStatus from "./reducers/sendMessageStatus";

const AllReducers = {currentUser, usersList, messagesList, signUpStatus, signInStatus, signOutStatus,sendMessageStatus};

export default createStore(combineReducers(AllReducers), {}, applyMiddleware(thunk))