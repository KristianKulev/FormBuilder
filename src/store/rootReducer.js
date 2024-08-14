import { combineReducers } from "redux";
import multiselectBuilderReducer from "../reducers/multiselectBuilderSlice";

const rootReducer = combineReducers({
  multiselectBuilderForm: multiselectBuilderReducer,
});

export default rootReducer;
