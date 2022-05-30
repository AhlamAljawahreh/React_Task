import { combineReducers, createStore } from "redux";
import loginReducer from "./Login/index";



const reducers = combineReducers({
  loginReducer,
});

const store = createStore(reducers);

export default store;
