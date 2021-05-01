import { createSelector } from "reselect";
import { filterAction } from "../../constants/action";
const todoReducer = (state) => state.todo;
const filterReducer = (state) => state.filter;
const searchReducer = (state) => state.search;
export const getFilter = createSelector(
  [filterReducer, todoReducer],
  (filterReducer, todoReducer) => {
    switch (filterReducer) {
      case filterAction.ALL:
        return todoReducer;
      case filterAction.ACTIVE:
        return todoReducer.filter((todoItem) => !todoItem.completed);
      case filterAction.COMPLETED:
        return todoReducer.filter((todoItem) => todoItem.completed);
      default:
        return todoReducer;
    }
  }
);

export const getSearch = createSelector(
  [getFilter, searchReducer],
  (getFilter, searchReducer) => {
    return getFilter.filter(
      (todoItem) => todoItem.title.toLowerCase().indexOf(searchReducer.toLowerCase()) !== -1
    );
  }
);
