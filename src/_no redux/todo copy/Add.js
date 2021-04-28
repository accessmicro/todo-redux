import React, { forwardRef } from "react";

const Add = (
  {
    item,
    onHandleChange,
    onHandleEnter,
    onChooseAll,
    onHandleBlurSearch,
    onSearch,
    isSearch,
    valueSearch,
    onHandleChangeSearch,
    onHandleDeleteSearch,
  },
  ref
) => {
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
          onChange={(event) => onHandleChange(event.target.value)}
          onKeyPress={(event) => onHandleEnter(event)}
          ref={ref}
        />
        <button
          className="todo__search-item btn--outline"
          onClick={(event) => onSearch(event)}
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
            onChange={(event) => onHandleChangeSearch(event.target.value)}
            onBlur={(event) => onHandleBlurSearch(event)}
            autoFocus
          />
        )}
        {valueSearch !== "" && (
          <span
            onClick={(event) => onHandleDeleteSearch(event)}
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

export default forwardRef(Add);
