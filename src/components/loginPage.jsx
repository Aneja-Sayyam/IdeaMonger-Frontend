import React, { useState } from "react";
import styles from "./loginPage.module.css";
import logo from "../images/logo.png";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { CSSTransition } from "react-transition-group";
import "./transition.css";

const Login = () => {
  const [signUp, showSignUp] = useState(false);
  const [transitionIn, setTransitionIn] = useState(false);
  const changeTransition = () => {
    showSignUp(!signUp);
    setTransitionIn(!transitionIn);
  }
  const displaySignUpOrLogIn = () => {
    if (signUp === false) {
      return (
        <div className={styles.signUp}>
          Not Signed Up ?
          <span
            onClick={changeTransition}
            className={styles.link}
          >
            Sign Up
          </span>
        </div>
      );
    } else {
      return (
        <div className={styles.signUp}>
          Already Have An Account ?
          <span
            onClick={changeTransition}
            className={styles.link}
          >
            Log In
          </span>
        </div>
      );
    }
  };
  const displayForm = () => {
    if (signUp === true) {
      return <SignUpForm showSignUp={showSignUp} />;
    } else {
      return <LoginForm/>;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.aboutProject}>
        <div className={styles.projectName}>Idea Monger</div>
        <div className={styles.catchphrase}>Inform,Inspire,Innovate</div>
        <div className={styles.tagline}>GO MONG YOURSELF !</div>
      </div>
      <CSSTransition in={transitionIn} timeout={1000} classNames="fade">
        <div className={styles.form}>
          <div>
            <img className={styles.logo} src={logo} alt="" />
          </div>

          {displayForm()}
          <hr />
          <div className={styles.others}>
            <div className={styles.forgotPass}>
              <a href="/" className={styles.link}>
              Forgot Password ?
              </a>
            </div>
            {displaySignUpOrLogIn()}
          </div>
        </div>
        </CSSTransition>
      </div>
  );
};

export default Login;
