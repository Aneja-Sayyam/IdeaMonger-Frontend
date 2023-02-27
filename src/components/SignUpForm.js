import React, { useContext, useState } from "react";
import styles from "./form.module.css";
import { UserContext } from "./userContext";

const SignUpForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [confirmPasswd, setConfirmPasswd] = useState("");
  const { signUpUser } = useContext(UserContext);
  const onSignUp = async () => {
    if (passwd === confirmPasswd) {
      const signUp = await signUpUser(firstName, lastName, email, passwd);
      let acknowledged = false;
      if (signUp === "user created") {
        acknowledged = window.confirm("User is Signed Up. Login to continue.");
      } else {
        acknowledged = window.confirm(
          "User already exists. Login to continue."
        );
      }
      if (acknowledged) {
        props.showSignUp(false);
      }
    } else {
      setPasswd("");
      setConfirmPasswd("");
      alert("Retype Your Password");
    }
  };
  return (
    <React.Fragment>
      <div className={styles.signUpInputs}>
        <input
          type="text"
          name="firstName"
          className={styles.input}
          placeholder="First Name"
          autoComplete="off"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          type="text"
          name="lastName"
          className={styles.input}
          placeholder="Last Name"
          autoComplete="off"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
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
        <input
          type="password"
          name="confirmPassword"
          className={styles.input}
          autoComplete="off"
          onChange={(e) => {
            setConfirmPasswd(e.target.value);
          }}
          value={confirmPasswd}
          placeholder="Confirm Password"
        />
      </div>
      <div onClick={onSignUp} className={styles.submitBtn}>
        Sign Up
      </div>
    </React.Fragment>
  );
};

export default SignUpForm;
