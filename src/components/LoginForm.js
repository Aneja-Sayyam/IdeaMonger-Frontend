import React, { useState, useContext } from "react";
import styles from "./form.module.css";
import { UserContext } from "./userContext";

const LoginForm = (props) => {
  const [email, setEmail] = useState("sayyam@blah.com");
  const [passwd, setPasswd] = useState("qwerty");
  const { loginUser } = useContext(UserContext);

  const login = async () => {
    const loggedIn = await loginUser(email, passwd);
    if (loggedIn === true) {
      window.open("/home", "_top");
    } else {
      alert("Please Check Email & Password");
    }
  };

  return (
    <React.Fragment>
      <div className={styles.loginInputs}>
        <input
          type="email"
          name="email"
          className={styles.input}
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="password"
          name="password"
          className={styles.input}
          autoComplete="off"
          onChange={(e) => {
            setPasswd(e.target.value);
          }}
          value={passwd}
          placeholder="Password"
        />
      </div>
      <div onClick={login} className={styles.submitBtn}>
        Login
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
