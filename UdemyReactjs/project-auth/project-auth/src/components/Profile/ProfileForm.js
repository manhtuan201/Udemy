import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import React from "react";
import { notification } from "antd";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const history = useHistory();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, des) => {
    api[type]({
      message: message,
      description: des,
    });
  };
  const changePasswordHandler = async (e) => {
    e.preventDefault();
    const enterPassword = passwordRef.current.value;
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCak6NGkSgW9weCnwuRS1NbUCb16O2RGgA",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enterPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.json();
    if (response.ok) {
      openNotificationWithIcon(
        "success",
        "Success",
        "You have change password successfully!"
      );
      history.push("/");
    }
  };
  return (
    <form className={classes.form}>
      {contextHolder}

      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" ref={passwordRef} id="new-password" />
      </div>
      <div className={classes.action}>
        <button onClick={changePasswordHandler}>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
