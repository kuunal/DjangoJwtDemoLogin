import React, { useEffect, useState } from "react";
import { requestToken } from "../actions/tokenAction";
import { connect } from "react-redux";
import axios from "axios";
import Headers from "./headers";
import { Grid } from "@material-ui/core";
import Item from "./item.js";

const refreshTokenURI = process.env.REACT_APP_BACKENDURI + "login/refresh/";

function ProductsComponent({ loginToken, newAccessToken, requestToken }) {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const productURI = process.env.REACT_APP_BACKENDURI + "products/?pageno=1";

  useEffect(() => {
    // getAccessToken()
    //   .then((res) => getProducts())
    //   .catch(console.log("Please login first"));
    if (newAccessToken === "")
      // setToken(newAccessToken)
      requestToken(refreshTokenURI);
    // console.log("sadsadsa");
    else getProducts();
  }, [newAccessToken]);

  const getAccessToken = () => {
    return new Promise((resolve, reject) => {
      if (
        loginToken === undefined ||
        loginToken === "" ||
        newAccessToken == ""
      ) {
        requestToken(refreshTokenURI);
        if (newAccessToken) resolve("Generated new access token");
        else reject("Failed to generate response token");
      }
    });
  };
  const getProducts = () => {
    axios
      .get(
        productURI,
        { headers: { "x-token": newAccessToken } },
        { withCredentials: true }
      )
      .then((res) => setProducts([...products, ...res.data]))
      .catch((res) => console.log(res.response));
  };
  return (
    <Grid container direction="column">
      {/* {newAccessToken && getProducts()} */}
      {console.log(newAccessToken)}
      <Grid item>
        <Headers />
      </Grid>
      <Grid item>
        {products.map((item, index) => (
          <Item item={item} key={index} />
        ))}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.response.message,
    newAccessToken: state.token.response.message,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestToken: (refreshTokenURI) => dispatch(requestToken(refreshTokenURI)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsComponent);
