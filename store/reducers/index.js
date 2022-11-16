import { combineReducers } from "redux";
import encounterReducer from "./encounterReducer";

export default combineReducers({
  encounter: encounterReducer,
});
