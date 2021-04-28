import Form from "./Form";
import React, { useState } from "react";
import { useHistory } from "react-router";

const Login = () => {
  const LINK_AVATAR = 'https://cdn.dribbble.com/users/3844750/screenshots/10729124/media/2523facfa3e436b8331c316dcc4998f2.jpg'
  const LINK_CHATWORK = 'https://www.chatwork.com/#!rid224360512'
  const EMAIL = 'nghiemnv@hblab.vn'
  const history = useHistory();
  const type = ["text", "password", "submit"];
  const list = ["username", "password", "submit"];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({});
  
  let validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  let validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(String(password));
  };
  let onHandleChange = (event) => {
    let id = event.target.id;
    let value = event.target.value;
    id === 'username' ? setUsername(value) : setPassword(value);
  };
  let onHandleBlur = (event) => {
    const id = event.target.id;
    if (id === list[0]) {
      if (validateEmail(username)) {
        setState((pre) => ({ ...pre, username: !0, noticeUsername: "" }));
      } else if (username.length > 0) {
        setState((pre) => ({
          ...pre,
          username: !1,
          noticeUsername: "Chưa nhập đúng định dạng email...",
        }));
      } else {
        setState((pre) => ({
          ...pre,
          username: !1,
          noticeUsername: "Mời bạn nhập username...",
        }));
      }
    }
    if (id === list[1]) {
      if (validatePassword(password)) {
        setState((pre) => ({ ...pre, password: !0, noticePassword: "" }));
      } else if (password.length >= 8) {
        setState((pre) => ({
          ...pre,
          password: !1,
          noticePassword:
            "Mật khẩu phải chứa ít nhất 1 sô, 1 chữ in HOA, 1 chữ thường...",
        }));
      } else if (password.length > 0) {
        setState((pre) => ({
          ...pre,
          password: !1,
          noticePassword:
            "Mật khẩu dài ít nhất 8 kí tự(chứa ít nhất 1 sô, 1 chữ in HOA, 1 chữ thường).",
        }));
      } else {
        setState((pre) => ({
          ...pre,
          password: !1,
          noticePassword: "Mời bạn nhập password...",
        }));
      }
    }

    if (
      state.username === true  &&
      state.password === true 
    ) {
      return true;
    } else return false;
  };
  let handleSubmit = (event) => {
    if (onHandleBlur(event)) {
      localStorage.setItem("token", !0);
      history.push({ pathname: "/todo", state: { username: username } });
    } else {
      alert("Hãy hoàn thiện form!");
    }
    event.preventDefault();
    setUsername("");
    setPassword("");
    setState({});
  };

  return (
    <div className="model">
      <div className="model__left">
        <div className="model__img">
          <a href={LINK_CHATWORK} target="_blank">
            <img
              src={LINK_AVATAR}
              alt="img"
              title={EMAIL}
            />
          </a>
        </div>
      </div>
      <div className="model__right">
        <Form
          list={list}
          value={[username, password, "Login"]}
          type={type}
          onHandleChange={onHandleChange}
          onHandleBlur={onHandleBlur}
          handleSubmit={handleSubmit}
          state={state}
        ></Form>
      </div>
    </div>
  );
};
export default Login;
