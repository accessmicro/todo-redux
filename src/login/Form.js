import React, { useState } from "react";
import Info from "./Info";
import Input from "./Input";
import Notice from "./Notice";

const Form = ({
  value,
  type,
  list,
  onHandleChange,
  onHandleBlur,
  state,
  handleSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  let showText = (event) => {
    event.preventDefault();
    event.target.id === "password" && setShowPassword((pre) => !pre);
  };
  let listItem = list.map((item, index) => (
    <Input
      key={item}
      className={item}
      id={item}
      type={index ===1 && showPassword ? "text" : type[index]}
      value={value[index]}
      placeholder={item}
      handleChange={onHandleChange}
      handleBlur={onHandleBlur}
    >
      {state[item] == null ? (
        <></>
      ) : state[item] === false && index === 0 ? (
        <Notice>{state.noticeUsername}</Notice>
      ) : state[item] === false && index === 1 ? (
        <Notice>{state.noticePassword}</Notice>
      ) : state[item] === true ? (
        <Info icon="fas fa-check-circle" color="green" />
      ) : (
        <></>
      )}
      {index === 1 && value[index] !== "" && (
        <button onClick={showText} id={item} className="btn-show">
          {index === 1 && showPassword ? (
            <i className="fas fa-eye-slash"></i>
          ) : (
            <i className="fas fa-eye"></i>
          )}
        </button>
      )}
    </Input>
  ));

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1 className="form__title">User Login</h1>
      {listItem}
    </form>
  );
};

export default Form;
