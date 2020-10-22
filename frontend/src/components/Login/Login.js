import React, { useState, a } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/loginAction";
import { Redirect } from "react-router-dom";
import { Alert } from "@material-ui/lab";

function LoginComponent(props) {
  const [email, setEmail] = useState("");
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [signInBtn, setSignInBtn] = useState("black");
  const [signUpBtn, setSignUpBtn] = useState("black");
  const primaryColor = "black";
  const secondaryColor = "dodgerblue";
  const [emailInputBorderColor, setEmailInputBorderColor] = useState("black");
  const [passwordInputBorderColor, setPasswordInputBorderColor] = useState(
    "black"
  );

  // Changing color of button on hover
  const setBtnStyle = (obj, color) => obj(color);

  // Email validation
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
      setEmail("");
      setEmailError("Please enter valid email!");
    }
  };

  // Password validation
  let validatePassword = (e) => {
    let passwordInput = e.target.value;
    if (passwordInput.length > 8) {
      setPassword(passwordInput);
      setPasswordError("");
    } else {
      setPassword("");
      setPasswordError("Minimum length required is 8");
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
    cursor: "pointer",
  };

  const signUpBtnStyle = {
    ...signInBtnStyle,
    background: signUpBtn,
  };

  const emailInputStyle = {
    border: "none",
    width: "40%",
    outline: "none",
    borderBottom: `1px solid ${emailInputBorderColor}`,
    marginLeft: "1em",
  };

  const setEmailFocus = (obj, color) => obj(color);

  const passwordInputStyle = {
    ...emailInputStyle,
    borderBottom: `1px solid ${passwordInputBorderColor}`,
  };

  // Submitting form and requesting for login
  const requestLogin = () => {
    if (email !== "" && password !== "") {
      props.login({ email, password });
    }
  };

  // If login successful redirect else show error message
  const verifyLogin = () => {
    if (props.statusCode === 200) {
      return <Redirect to="/products/" />;
    } else if (props.statusCode === 401) {
      return (
        <Alert variant="filled" severity="error">
          Please provide valid details
        </Alert>
      );
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
    {verifyLogin()}
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
          style={emailInputStyle}
          onFocus={() =>
            setEmailFocus(setEmailInputBorderColor, secondaryColor)
          }
        />
        <br />
        {emailError ? <Alert severity="error">{emailError}</Alert> : null}
        <br />
        <label for="password">Password :</label>
        <input
          type="password"
          name="password"
          onChange={validatePassword}
          placeholder="********"
          style={passwordInputStyle}
          onFocus={() =>
            setEmailFocus(setPasswordInputBorderColor, secondaryColor)
          }
        />
        <br />
        {passwordError ? (
          <Alert severity="warning">{passwordError}</Alert>
        ) : null}

        <br />
        <button
          type="submit"
          style={signInBtnStyle}
          onMouseEnter={() => setBtnStyle(setSignInBtn, secondaryColor)}
          onMouseOut={() => setBtnStyle(setSignInBtn, primaryColor)}
          onClick={requestLogin}
        >
          SignIn
        </button>
        <button
          type="submit"
          style={signUpBtnStyle}
          onMouseEnter={() => setBtnStyle(setSignUpBtn, secondaryColor)}
          onMouseOut={() => setBtnStyle(setSignUpBtn, primaryColor)}
        >
          SignUp
        </button>
        <br />
      </div>
    </form>
    </>
  );
}

const loginContainer = {};

const loginFormStyle = {
  margin: "8% auto",
  border: "1px solid gray",
  boxShadow: "1px 1px 1px 1px gray",
  borderRadius: "2px  ",
  width: "30%",
  height: "100%",
};

const mapStateToProps = (state) => {
  return {
    statusCode: state.login.response.statusCode,
    xtoken: state.login.response.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
