let initialState = [];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_ALL":
      return [...action.payload];

    case "ON_CHOOSE_ALL":
      return state;

    case "ON_HANDLE_ENTER":
      console.log("state ON_HANDLE_ENTER:>> ", [...state, action.payload]);
      return [...state, action.payload];

    case "ON_HANDLE_DELETE":
      return state.filter((todoItem) => todoItem.id !== action.payload);

    case "ON_HANDLE_DBL":
      const indexDBL = state.findIndex(
        (todoItem) => todoItem.id === action.payload.target.id
      );
      return state.map((todoItem, indexItem) =>
        indexItem === indexDBL
          ? { ...todoItem, isUpdate: !todoItem.isUpdate }
          : { ...todoItem }
      );

    case "ON_HANDLE_ENTER_INPUT":
      const index_ENTER_INPUT = state.findIndex(
        (todoItem) => todoItem.id === action.payload.id
      );
      return state.map((todoItem, indexItem) =>
        indexItem === index_ENTER_INPUT
          ? { ...action.payload }
          : { ...todoItem }
      );

    case "ON_CHANGE_CHECKED":
      const index_CHANGE_CHECKED = state.findIndex(
        (todoItem) => todoItem.id === action.payload.id
      );
      return state.map((todoItem, indexItem) =>
        indexItem === index_CHANGE_CHECKED
          ? { ...action.payload }
          : { ...todoItem }
      );

    case "ON_HANDLE_BLUR":
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

export default todoReducer;
