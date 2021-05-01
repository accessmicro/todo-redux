import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { onHandleEnterAction } from "../actions/todo";

const Add = ({ handleChooseAll, handleChangeInputSearch, valueSearch, handleDeleteSearch , isSearch,handleSearch}) => {
  const addInput = useRef();
  const [item, setItem] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    addInput.current.focus();
  }, []);
  const handleChange = (event) => {
    setItem(event.target.value);
  };
  const handleEnter = (event) => {
    const ENTER = 13;
    if (event.charCode === ENTER) {
      dispatch(onHandleEnterAction(item));
      setItem("");
    }
  };

  const handleBlurSearch = () => {
    addInput.current.focus();
  };
  return (
    <React.Fragment>
      <div className="todo__search">
        <button className="todo__choose btn--outline" onClick={handleChooseAll}>
          <i className="fas fa-angle-down"></i>
        </button>
        <input
          placeholder="What needs to be done?"
          type="text"
          className="todo__input"
          value={item}
          onChange={handleChange}
          onKeyPress={handleEnter}
          ref={addInput}
        />
        <button
          className="todo__search-item btn--outline"
          onClick={handleSearch}
        >
          {!isSearch ? (
            <i className="fas fa-search"></i>
          ) : (
            <i className="fas fa-plus"></i>
          )}
        </button>
        {isSearch && (
          <input
            placeholder="Search..."
            type="text"
            className="todo__search-input"
            value={valueSearch}
            onChange={handleChangeInputSearch}
            onBlur={handleBlurSearch}
            autoFocus
          />
        )}
        {valueSearch !== "" && (
          <span
            onClick={handleDeleteSearch}
            className="todo__search-info"
            style={{ backgroundColor: "rgb(165, 235, 177)" }}
          >
            {valueSearch} <i className="fas fa-times"></i>
          </span>
        )}
      </div>
    </React.Fragment>
  );
};

export default Add;
