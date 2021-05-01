import { filterAction } from "../constants/action";

export const handleAllAction = () => {
  return { type: filterAction.ALL };
};
export const handleActiveAction = () => {
  return { type: filterAction.ACTIVE };
};
export const handleCompletedAction = () => {
  return { type: filterAction.COMPLETED };
};
