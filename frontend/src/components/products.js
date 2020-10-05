import React, { useEffect, useState } from "react";
import { requestToken } from "../actions/tokenAction";
import { connect } from "react-redux";
import axios from "axios";
import Headers from "./headers";
import { Grid, makeStyles } from "@material-ui/core";
import Item from "./item.js";

const refreshTokenURI = process.env.REACT_APP_BACKENDURI + "login/refresh/";
const useStyle = makeStyles({
  gridContainer: {
    paddingLeft: "100px",
    paddingRight: "100px",
  },
});

const gridStyle = {
  width: 230,
  height: 300,
  marginBottom: "3%",
};

function ProductsComponent({ loginToken, newAccessToken, requestToken }) {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const productURI = process.env.REACT_APP_BACKENDURI + "products/?pageno=1";

  const classes = useStyle();
  useEffect(() => {
    if (newAccessToken === "") requestToken(refreshTokenURI);
    else getProducts();
  }, [newAccessToken]);

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
      <Grid item>
        <Headers />
      </Grid>
      {console.log(products.len)}
      <Grid
        item
        container
        justify="center"
        spacing="4"
        className={classes.gridContainer}
      >
        {products.map((item, index) => (
          <Grid item style={gridStyle}>
            <Item item={item} key={index} />
          </Grid>
        ))}
      </Grid>
      <Grid item>Pagination</Grid>
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
