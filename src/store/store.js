import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const AllReducers = {};

export default createStore(combineReducers(AllReducers), {}, applyMiddleware(thunk))