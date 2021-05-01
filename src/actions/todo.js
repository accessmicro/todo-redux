import { todoAction } from "../constants/action";
import store from "../store";
import api from "../todo/callAPI";
import { hideLoading, showLoading } from "./load";

export const callAPI = () => {
  return (dispatch) => {
    dispatch(showLoading());
    api.get("/").then((res) => {
      dispatch({ type: todoAction.listAll, payload: res.data });
      dispatch(hideLoading());
    });
  };
};

export const onHandleChooseAllAction = (count) => {
  const todoReducer = store.getState().todo;
  return (dispatch) => {
    dispatch(showLoading());

    if (count > 0) {
      let newTodos = [...todoReducer];
      todoReducer.forEach(async (todoItem, indexTodo) => {
        const data = await api.put(`/${todoItem.id}`, {
          ...todoItem,
          completed: true,
        });
        newTodos.splice(indexTodo, 1, data);
      });
      dispatch({ type: todoAction.handleChooseAll, payload: true });
      dispatch(hideLoading());
    } else {
      let newTodos = [...todoReducer];
      todoReducer.forEach(async (todoItem, indexTodo) => {
        const data = await api.put(`/${todoItem.id}`, {
          ...todoItem,
          completed: false,
        });
        newTodos.splice(indexTodo, 1, data);
      });
      dispatch({ type: todoAction.handleChooseAll, payload: false });
      dispatch(hideLoading());
    }
  };
};

export const onHandleClearCompletedAction =  () => {
  const todoReducer = store.getState().todo;
  return (dispatch) => {
    todoReducer.forEach((todoItem) => {
      if  (todoItem.completed) {
        dispatch(showLoading());
         api.delete(`/${todoItem.id}`).then((res) => {
          dispatch({
            type: todoAction.handleClearCompleted,
            payload: res.data.id,
          });
          dispatch(hideLoading());
        });
      }
    });
  };
};

export const onHandleDeleteAction = (idItem) => {
  return (dispatch) => {
    dispatch(showLoading());
    api.delete(`/${idItem}`).then((res) => {
      dispatch({
        type: todoAction.handleDelete,
        payload: res.data.id,
      });
    });
  };
};

export const onHandleEnterAction = (item) => {
  return (dispatch) => {
    dispatch(showLoading());
    if (item !== "") {
      api
        .post(`/`, { title: item, completed: false, isUpdate: false })
        .then((res) => {
          dispatch({
            type: todoAction.handleEnter,
            payload: res.data,
          });
          dispatch(hideLoading());
        });
    } else if (item === "") {
      dispatch(hideLoading());

      alert("Mời bạn nhập thông tin!");
    }
  };
};

export const onChangeCheckedAction = (id, data) => {
  return (dispatch) => {
    dispatch(showLoading());
    return api.put(`/${id}`, data).then((res) => {
      dispatch({ type: todoAction.handleChangeChecked, payload: res.data });
      dispatch(hideLoading());
    });
  };
};

export const onHandleDblAction = (idEvent) => {
  return {
    type: todoAction.handleDoubleClick,
    payload: idEvent,
  };
};

export const onHandleEnterInputAction = ([eventId, eventValue]) => {
  return (dispatch) => {
    if (eventValue !== "") {
      dispatch(showLoading());
      api
        .put(`/${eventId}`, { title: eventValue, isUpdate: false })
        .then((res) => {
          dispatch({
            type: todoAction.handleEnterInput,
            payload: res.data,
          });
          dispatch(hideLoading());
        });
    } else {
      dispatch(showLoading());
      api.delete(`/${eventId}`).then((res) => {
        dispatch({
          type: todoAction.handleDelete,
          payload: res.data.id,
        });
        dispatch(hideLoading());
      });
    }
  };
};

export const onHandleBlurAction = ([eventId, eventValue]) => {
  return (dispatch) => {
    if (eventValue === "") {
      dispatch(showLoading());
      api.delete(`/${eventId}`).then((res) => {
        dispatch({
          type: todoAction.handleDelete,
          payload: res.data.id,
        });
        dispatch(hideLoading());
      });
    } else {
      dispatch(showLoading());
      api
        .put(`/${eventId}`, { isUpdate: false, title: eventValue })
        .then((res) => {
          dispatch({
            type: todoAction.handleBlur,
            payload: res.data,
          });
          dispatch(hideLoading());
        });
    }
  };
};
