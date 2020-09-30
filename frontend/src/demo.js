import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "./acitons/loginAction";

function Demo(props) {
  const [email, setEmail] = useState("");
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [signInBtn, setSignInBtn] = useState("black");
  const [signUpBtn, setSignUpBtn] = useState("black");

  const setBtnStyle = (obj, color) => obj(color);

  const validateEmail = (e) => {
    let emailInput = e.target.value;
    if (
      emailInput.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setEmail(emailInput);
      setEmailError("");
    } else {
      setEmailError("Invalid");
    }
  };

  let validatePassword = (e) => {
    let password = e.target.value;
    if (password.length > 8) {
      setPassword(password);
      setPasswordError("");
    } else {
      setPasswordError("Invalid");
    }
  };

  const signInBtnStyle = {
    color: "white",
    margin: "2em",
    width: "30%",
    background: signInBtn,
    border: "0.1px solid gray",
    borderBottom: ".3px solid black",
    height: "2em",
    borderRadius: "5px",
  };

  const signUpBtnStyle = {
    ...signInBtnStyle,
    background: signUpBtn,
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    borderBottom: "1px solid black",
    marginLeft: "1em",
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  useEffect(() => {
    // props.login();
  }, []);
  return (
    <form
      id="LoginForm"
      method="POST"
      onSubmit={formSubmit}
      style={loginFormStyle}
    >
      <div style={loginContainer}>
        <h1 style={{ marginBottom: "1.5em" }}>Login page</h1>
        <label for="email" style={{ marginRight: "12px" }}>
          LoginId :
        </label>
        <input
          type="text"
          name="email"
          placeholder="abc@gmial.com"
          onChange={validateEmail}
          style={inputStyle}
        />
        <br />
        <p style={{ color: "red" }}>{emailError}</p>
        <br />
        <label for="password">Password :</label>
        <input
          type="password"
          name="password"
          onChange={validatePassword}
          placeholder="********"
          style={inputStyle}
        />
        <br />
        <p style={{ color: "red" }}>{passwordError}</p>
        <br />
        <button
          type="submit"
          style={signInBtnStyle}
          onMouseEnter={() => setBtnStyle(setSignInBtn, "blue")}
          onMouseOut={() => setBtnStyle(setSignInBtn, "black")}
        >
          SignIn
        </button>
        <button
          type="submit"
          style={signUpBtnStyle}
          onMouseEnter={() => setBtnStyle(setSignUpBtn, "blue")}
          onMouseOut={() => setBtnStyle(setSignUpBtn, "black")}
        >
          SignUp
        </button>
        <br />
      </div>
    </form>
  );
}

const loginContainer = {
  // marginTop: "30%",
  // background: "black",
};

const loginFormStyle = {
  margin: "10% auto",
  border: "1px solid gray",
  boxShadow: "1px 1px 1px 1px black",
  width: "30%",
  height: "350px",
};

const mapStateToProps = (state) => {
  return {
    xtoken: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
