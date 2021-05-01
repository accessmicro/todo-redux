import { combineReducers } from "redux";
import { todoReducer } from "./todo";
import { filterReducer } from "./filter";
import { searchReducer } from "./search";
import { loadReducer } from "./load";

const rootReducer = combineReducers({
  todo: todoReducer,
  filter: filterReducer,
  search: searchReducer,
  load: loadReducer
});
export default rootReducer;
