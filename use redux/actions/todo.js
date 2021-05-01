import { todoAction } from "../constants/action";
import store from "../store";
import api from "../todo/callAPI";


export const callAPI = () => {
  return (dispatch) => {
    return api.get("/").then((res) => {
      dispatch({ type: todoAction.listAll, payload: res.data });
    });
  };
};

export const onHandleChooseAllAction = (count) => {
  const todoReducer = store.getState().todo;
  return (dispatch) => {
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
    }
  };
};

export const onHandleClearCompletedAction = () => {
  const todoReducer = store.getState().todo;
  return (dispatch) => {
    todoReducer.forEach((todoItem) => {
      todoItem.completed&&
      api.delete(`/${todoItem.id}`).then(res=>{
        dispatch({
          type: todoAction.handleClearCompleted,
          payload: res.data.id
        });
      });
    });
    
  };
};

export const onHandleDeleteAction = (idItem) => {
  return (dispatch) => {
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
    if (item !== "") {
      api
        .post(`/`, { title: item, completed: false, isUpdate: false })
        .then((res) => {
          dispatch({
            type: todoAction.handleEnter,
            payload: res.data,
          });
        });
    } else if (item === "") {
      alert("Mời bạn nhập thông tin!");
    }
  };
};

export const onChangeCheckedAction = (id, data) => {
  return (dispatch) => {
    return api.put(`/${id}`, data).then((res) => {
      dispatch({ type: todoAction.handleChangeChecked, payload: res.data });
    });
  };
};

export const onHandleDblAction = (idEvent) => {
  return {
    type: todoAction.handleDoubleClick,
    payload: idEvent
  };
};

export const onHandleEnterInputAction = ([eventId, eventValue]) => {
  return (dispatch) => {
    if (eventValue !== "") {
      api
        .put(`/${eventId}`, { title: eventValue, isUpdate: false })
        .then((res) =>
          dispatch({
            type: todoAction.handleEnterInput,
            payload: res.data,
          })
        );
    } else {
      api.delete(`/${eventId}`).then((res) => {
        dispatch({
          type: todoAction.handleDelete,
          payload: res.data.id,
        });
      });
    }
  };
};

export const onHandleBlurAction = ([eventId, eventValue]) => {
  return (dispatch) => {
    if (eventValue === "") {
      api.delete(`/${eventId}`).then((res) => {
        dispatch({
          type: todoAction.handleDelete,
          payload: res.data.id,
        });
      });
    } else {
      api
        .put(`/${eventId}`, { isUpdate: false, title: eventValue })
        .then((res) => {
          dispatch({
            type: todoAction.handleBlur,
            payload: res.data,
          });
        });
    }
  };
};
