import { searchAction } from "../constants/action";

export const searchReducer = (state = '', action) => {
  switch (action.type) {
    case searchAction.handleSearch:
        return action.payload
    default:
      return state;
  }
};
