import { notification } from "antd";
import { useRef, useState, useContext } from "react";
import React from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, des) => {
    api[type]({
      message: message,
      description: des,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const enterEmail = emailInputRef.current.value;
    const enterPassword = passwordInputRef.current.value;
    setIsLoading(true);
    if (isLogin) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCak6NGkSgW9weCnwuRS1NbUCb16O2RGgA`,
        {
          method: "POST",
          body: JSON.stringify({
            email: enterEmail,
            password: enterPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        openNotificationWithIcon(
          "success",
          "Success",
          "You have successfully login a user"
        );
        authCtx.login(data.idToken);
        history.push('/')
        setIsLoading(false);
      }
      if (!response.ok) {
        openNotificationWithIcon("warning", "Warning", data.error.message);
      }
      setIsLoading(false);
      setInput({ email: "", password: "" });
    } else {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCak6NGkSgW9weCnwuRS1NbUCb16O2RGgA`,
        {
          method: "POST",
          body: JSON.stringify({
            email: enterEmail,
            password: enterPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        openNotificationWithIcon(
          "success",
          "Success",
          "You have successfully created a user"
        );
      }
      if (!response.ok) {
        openNotificationWithIcon("warning", "Warning", data.error.message);
        setIsLoading(false);
      }
      setIsLoading(false);
      setInput({ email: "", password: "" });
      return null;
    }
  };

  return (
    <section className={classes.auth} onSubmit={submitHandler}>
      {contextHolder}
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={input.email}
            onChange={handleChangeInput}
            ref={emailInputRef}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={handleChangeInput}
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
