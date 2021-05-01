import { combineReducers } from "redux";
import { todoReducer } from "./todo";
import { filterReducer } from "./filter";
import { searchReducer } from "./search";

const rootReducer = combineReducers({
  todo: todoReducer,
  filter: filterReducer,
  search: searchReducer
});
export default rootReducer;
