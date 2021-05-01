import { searchAction } from "../constants/action";

export const onHandleSearchAction = (valueSearch) => {
  return {
    type: searchAction.handleSearch,
    payload: valueSearch,
  };
};
