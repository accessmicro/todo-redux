import { loadAction } from "../constants/action";

export const loadReducer = (state = true, action) => {
  switch (action.type) {
    case loadAction.showLoading:
      return true;
    case loadAction.hideLoading:
      return false;
      default:
          return null
  }
};
