import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  onChangeCheckedAction,
  onHandleDblAction,
  onHandleEnterInputAction,
  onHandleDeleteAction,
  onHandleBlurAction
} from "./../actions/todo";
const Item = ({
  id,
  isChecked,
  title,
  isUpdate,
}) => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState("");

  const handleChecked = (event) => {
    dispatch(
      onChangeCheckedAction(event.target.id, {
        completed: event.target.checked,
      })
    );
  };
  const handleEnterInput = (event) => {
    const ENTER = 13;
    if (event.charCode === ENTER) {
      dispatch(onHandleEnterInputAction([event.target.id, event.target.value]));
    }
  };
  const handleChangeInput = (event) => {
    setTarget(event.target.value);
  };
  const handleDoubleClick = (event) => {
    event.preventDefault();
    setTarget(event.target.textContent);
    dispatch(onHandleDblAction(event));
  };
  const handleDelete =(event)=>{
    dispatch(onHandleDeleteAction(event.target.id))
  }
  const handleBlur =(event)=> {
    dispatch(onHandleBlurAction([event.target.id, event.target.value]))
  }

  return (
    <div className="form" id={id}>
      <input
        type="checkbox"
        className="form__check"
        id={id}
        checked={isChecked}
        onChange={handleChecked}
      />
      <label htmlFor={id} className="pre"></label>
      <span
        className="form__title"
        id={id}
        style={
          isChecked ? { textDecoration: "line-through", color: "#e8ebf0" } : {}
        }
        onDoubleClick={handleDoubleClick}
      >
        {title}
      </span>
      {isUpdate && (
        <input
          type="text"
          className="form__update"
          value={target}
          id={id}
          onKeyPress={handleEnterInput}
          onChange={handleChangeInput}
          onBlur={handleBlur}
          autoFocus
        />
      )}
      <button
        className="form__submit btn--outline"
        onClick={handleDelete}
        id={id}
      ></button>
    </div>
  );
};

export default Item;
