import React, { useEffect, useState } from "react";
import { requestToken } from "../actions/tokenAction";
import { connect } from "react-redux";
import axios from "axios";

const refreshTokenURI = process.env.REACT_APP_BACKENDURI + "login/refresh/";

function ProductsComponent({ loginToken, newAccessToken, requestToken }) {
  const [products, setProducts] = useState("");
  const productURI = process.env.REACT_APP_BACKENDURI + "products/?pageno=1";

  useEffect(() => {
    if (loginToken === undefined || loginToken === "" || newAccessToken == "") {
      requestToken(refreshTokenURI);
    }
  }, []);

  const getProducts = () => {
    axios
      .get(
        productURI,
        { headers: { "x-token": newAccessToken } },
        { withCredentials: true }
      )
      .then((res) => console.log(res.data))
      .catch((res) => console.log(res.response));
  };
  return (
    <div>
      <button type="submit" name="products" onClick={getProducts}>
        GET PRODUCTS
      </button>
    </div>
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
