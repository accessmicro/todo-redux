import React, { forwardRef, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { onHandleEnterAction } from "../actions/todo";

const Add = (
  {
    // item,
    // onHandleChange,
    // onHandleEnter,
    onChooseAll,
    onHandleBlurSearch,
    // onSearch,
    // isSearch,
    // valueSearch,
    // onHandleChangeSearch,
    // onHandleDeleteSearch,
  }
  
) => {
  const addInput = useRef()
  const [item, setItem] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch();
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
  const handleSearch = () => {
    setIsSearch((pre) => !pre);
  };
  const handleChangeInputSearch =(event)=>{
    setValueSearch(event.target.value)
  }
  const handleDeleteSearch =(event)=>{
    setValueSearch('')
    setIsSearch(false)
  }
  return (
    <React.Fragment>
      <div className="todo__search">
        <button
          className="todo__choose btn--outline"
          onClick={(event) => onChooseAll(event)}
        >
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
            onBlur={(event) => onHandleBlurSearch(event)}
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

export default (Add);
