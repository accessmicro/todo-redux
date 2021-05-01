import { filterAction } from "../constants/action";
export const filterReducer = (state = filterAction.ALL, action) => {
  switch (action.type) {
    case filterAction.ALL:
      return filterAction.ALL;
    case filterAction.ACTIVE:
      return filterAction.ACTIVE;
    case filterAction.COMPLETED:
      return filterAction.COMPLETED;
    default:
      return state;
  }
};
