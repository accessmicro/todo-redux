import React from "react";
const Item = ({
  id,
  onChecked,
  onChangeChecked,
  handleDbl,
  title,
  isUpdate,
  target,
  handleUpdate,
  handleEnter,
  handleBlur,
  handleDelete,
}) => {
  return (
    <div className="form" id={id}>
      <input
        type="checkbox"
        className="form__check"
        id={id}
        checked={onChecked}
        onChange={(event) => onChangeChecked(event)}
      />
      <label htmlFor={id} className="pre"></label>
      <span
        className="form__title"
        id={id}
        style={
          onChecked ? { textDecoration: "line-through", color: "#e8ebf0" } : {}
        }
        onDoubleClick={(event) => handleDbl(event)}
      >
        {title}
      </span>
      {isUpdate && (
        <input
          type="text"
          className="form__update"
          value={target}
          id={id}
          onChange={(event) => handleUpdate(event.target.value)}
          onKeyPress={(event) => handleEnter(event)}
          onBlur={(event) => handleBlur(event)}
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
