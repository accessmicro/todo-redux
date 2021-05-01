import { loadAction } from "../constants/action";

export const showLoading = () => {
  return { type: loadAction.showLoading };
};
export const hideLoading = () => {
  return { type: loadAction.hideLoading };
};
