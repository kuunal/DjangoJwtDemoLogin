import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "./acitons/loginAction";
import { Redirect } from "react-router-dom";

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
      setEmail("");
      setEmailError("No such email id");
    }
  };

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

  const requestLogin = () => {
    if (email !== "" && password !== "") {
      props.login({ email, password });
    }
  };

  const cb = () => {
    if (props.statusCode === 200) {
      return <Redirect to="products/" />;
    }
    //   // alert("Invalid Id or Password");
    //   // props.statusCode && setPasswordError("Invalid Id or Pass");
    // }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  // useEffect(() => {
  //   cb();
  // }, [props.xtoken]);
  return (
    <form
      id="LoginForm"
      method="POST"
      onSubmit={formSubmit}
      style={loginFormStyle}
    >
      {cb()}
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
        <p style={{ color: "red" }}>{emailError}</p>
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
        <p style={{ color: "red" }}>{passwordError}</p>
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
    statusCode: state.response.statusCode,
    xtoken: state.response.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
