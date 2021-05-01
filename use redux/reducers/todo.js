import { todoAction } from "../constants/action";

let initialState = [];

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoAction.listAll:
      return [...action.payload];
      
    case todoAction.handleChooseAll:
      return [
        ...state.map((todoItem) => ({
          ...todoItem,
          completed: action.payload,
        })),
      ];

    case todoAction.handleClearCompleted:
      return state.filter((todoItem) => todoItem.id !== action.payload);

    case todoAction.handleEnter:
      return [...state, action.payload];

    case todoAction.handleDelete:
      return state.filter((todoItem) => todoItem.id !== action.payload);

    case todoAction.handleDoubleClick:
      const indexDBL = state.findIndex(
        (todoItem) => todoItem.id === action.payload
      );
      return state.map((todoItem, indexItem) =>
        indexItem === indexDBL
          ? { ...todoItem, isUpdate: !todoItem.isUpdate }
          : { ...todoItem }
      );

    case todoAction.handleEnterInput:
      const index_ENTER_INPUT = state.findIndex(
        (todoItem) => todoItem.id === action.payload.id
      );
      return state.map((todoItem, indexItem) =>
        indexItem === index_ENTER_INPUT
          ? { ...action.payload }
          : { ...todoItem }
      );

    case todoAction.handleChangeChecked:
      const index_CHANGE_CHECKED = state.findIndex(
        (todoItem) => todoItem.id === action.payload.id
      );
      return state.map((todoItem, indexItem) =>
        indexItem === index_CHANGE_CHECKED
          ? { ...action.payload }
          : { ...todoItem }
      );

    case todoAction.handleBlur:
      const index_BLUR = state.findIndex(
        (todoItem) => todoItem.id === action.payload.id
      );
      return state.map((todoItem, indexItem) =>
        indexItem === index_BLUR ? { ...action.payload } : { ...todoItem }
      );

    default:
      return state;
  }
};
