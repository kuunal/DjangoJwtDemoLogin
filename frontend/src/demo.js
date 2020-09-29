import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "./acitons/loginAction";

function Demo(props) {
  useEffect(() => {
    props.login();
  }, []);
  console.log(props.xtoken);
  return <div>asdasd{}</div>;
}
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
