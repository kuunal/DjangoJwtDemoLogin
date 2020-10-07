import React, { useEffect, useState } from "react";
import { requestToken } from "../actions/tokenAction";
import { connect } from "react-redux";
import axios from "axios";
import Headers from "./headers";
import { Grid, makeStyles } from "@material-ui/core";
import Item from "./item.js";
import { Pagination } from "@material-ui/lab";

const refreshTokenURI = process.env.REACT_APP_BACKENDURI + "login/refresh/";
const useStyle = makeStyles({
  gridContainer: {
    paddingLeft: "150px",
    paddingRight: "150px",
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
  const [pageNo, setPageNo] = useState("1");
  const productURI =
    process.env.REACT_APP_BACKENDURI + "products/?pageno=" + pageNo;
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");

  const classes = useStyle();
  useEffect(() => {
    if (newAccessToken === "") requestToken(refreshTokenURI);
    else getProducts();
  }, [newAccessToken, pageNo]);

  const getProducts = () => {
    axios
      .get(
        productURI,
        { headers: { "x-token": newAccessToken } },
        { withCredentials: true }
      )
      .then((res) => {
        setProducts([...res.data.products]);
        setNextPage(res.data.next_page);
        setPrevPage(res.data.prev_page);
      })
      .catch((res) => console.log(res.response));
  };

  const handleChange = (event, value) => {
    setPageNo(value);
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Headers />
      </Grid>
      <Grid
        item
        container
        justify="center"
        spacing="4"
        className={classes.gridContainer}
      >
        <Grid item container>
          <Grid item container justify="space-between">
            Book
            <Grid item>
              <select>
                <option>Relevance</option>
                <option>Price</option>
                <option>Author</option>
                <option>Title</option>
              </select>
            </Grid>
          </Grid>
        </Grid>
        {products.map((item, index) => (
          <Grid item style={gridStyle}>
            <Item item={item} key={index} />
          </Grid>
        ))}
        <Grid item container justify="center">
          <Pagination
            color="primary"
            count={7}
            siblingCount={0}
            boundaryCount={1}
            onChange={handleChange}
          />
        </Grid>
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
