import api from "../todo/callAPI";

export const callAPI = () => {
  return (dispatch) => {
    return api.get("/").then((res) => {
      dispatch({ type: "LIST_ALL", payload: res.data });
    });
  };
};
export const getAPI = async () => {
  return await api.get("/");
};
export const onChooseAllAction = (count) => {
  return (dispatch) => {
    getAPI();
  };
  // return {
  //     type: 'ON_CHOOSE_ALL',
  //     payload: null
  // }
};

export const onHandleDeleteAction = (idItem) => {
  return (dispatch) => {
    api.delete(`/${idItem}`).then((res) => {
      dispatch({
        type: "ON_HANDLE_DELETE",
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
            type: "ON_HANDLE_ENTER",
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
      dispatch({ type: "ON_CHANGE_CHECKED", payload: res.data });
    });
  };
};
export const onHandleDblAction = (event) => {
  return {
    type: "ON_HANDLE_DBL",
    payload: event,
  };
};
export const onHandleUpdate = (todo) => {
  return {
    type: " ON_HANDLE_UPDATE",
    payload: todo,
  };
};
export const onHandleEnterInputAction = ([eventId, eventValue]) => {
  return (dispatch) => {
    if (eventValue !== "") {
      api
        .put(`/${eventId}`, { title: eventValue, isUpdate: false })
        .then((res) =>
          dispatch({
            type: "ON_HANDLE_ENTER_INPUT",
            payload: res.data,
          })
        );
    } else {
      onHandleDeleteAction(eventId);
    }
  };
};
export const onHandleBlurAction = ([eventId, eventValue]) => {
  return (dispatch) => {
    if (eventValue === "") {
      api.delete(`/${eventId}`).then((res) => {
        dispatch({
          type: "ON_HANDLE_DELETE",
          payload: res.data.id,
        });
      });
    } else {
      api
        .put(`/${eventId}`, { isUpdate: false, title: eventValue })
        .then((res) => {
          dispatch({
            type: "ON_HANDLE_BLUR",
            payload: res.data,
          });
        });
    }
  };
};
export const onHandleClearCompletedAction = () => {
  return {
    type: "ON_HANDLE_CLEAR_COMPLETED ",
    payload: null,
  };
};
export const onHandleAll = (todo) => {
  return {
    type: " ON_HANDLE_ALL",
    payload: todo,
  };
};
export const onHandleActive = (todo) => {
  return {
    type: " ON_HANDLE_ACTIVE",
    payload: todo,
  };
};
export const onHandleCompleted = (todo) => {
  return {
    type: " ON_HANDLE_COMPLETED",
    payload: todo,
  };
};
export const onSearch = (todo) => {
  return {
    type: "ON_SEARCH ",
    payload: todo,
  };
};
export const onHandleChangeSearch = (todo) => {
  return {
    type: " ON_HANDLE_CHANGE_SEARCH",
    payload: todo,
  };
};
export const onHandleDeleteSearch = (todo) => {
  return {
    type: "ON_HANDLE_DELETE_SEARCH ",
    payload: todo,
  };
};
export const onHandleBlurSearch = (todo) => {
  return {
    type: " ON_HANDLE_BLUR_SEARCH",
    payload: todo,
  };
};
