import React, { useEffect, useState } from "react";
import { requestToken } from "../../actions/tokenAction";
import { requestCart } from "../../actions/cartAction";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Headers from "../headers/headers";
import {
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Item from "./item.js";
import Page from "./page";
import Dropdown from './dropdown'

const refreshTokenURI = process.env.REACT_APP_BACKENDURI + "login/refresh/";
const bookStoreURI = process.env.REACT_APP_BOOKSTOREURI+"cart/";

function ProductsComponent({ loginToken, newAccessToken, statusCode, requestToken, requestCart }) {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [pageNo, setPageNo] = useState(window.sessionStorage.getItem("pageNo")?window.sessionStorage.getItem("pageNo"):"1");
  const productURI =
    process.env.REACT_APP_BACKENDURI + "products/";
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [ dropDownValue, setDropDownValue ] = useState("author")
  const theme = useTheme();
  const xsWidth = useMediaQuery(theme.breakpoints.down("xs"));
  const useStyle = makeStyles({
    gridContainer: {
      paddingLeft: !xsWidth ? "150px" : "30px",
      paddingRight: !xsWidth ? "150px" : "30px",
    },
  });
  const gridStyle = {
    width: 230,
    height: 300,
    marginBottom: "3%",
  };
  const classes = useStyle();

  useEffect(() => {
    if (newAccessToken === "") requestToken(refreshTokenURI);
    else {
      getProducts();
      loginToken ? requestCart(loginToken, bookStoreURI) : requestCart(newAccessToken, bookStoreURI)
    }
  }, [newAccessToken, pageNo, dropDownValue]);

  const getProducts = () => {
    axios
      .get(
        productURI,
        {params:{"pageno": pageNo, "sortby": dropDownValue},
        headers: { "x-token": newAccessToken } },
        { withCredentials: true }
      )
      .then((res) => {
        setProducts([...res.data.products]);
        // setNextPage(res.data.next_page);
        // setPrevPage(res.data.prev_page);
        setTotalPage(res.data.total_page);
        setTotalProducts(res.data.total_products);
        console.log(res.data.total_products);
      })
      .catch((res) => console.log(res.response));
  };

  const handleChange = (event, value) => {
    setPageNo(value);
    window.sessionStorage.setItem("pageNo",value);
  };

  const isLoggedIn = () =>{

    if (statusCode === 401){
      return <Redirect to="login/" />
    }
  }

  const dropDownOnClickHandler = (e)=>{
    setDropDownValue(e.target.value)
  }

  return (
    <Grid container direction="column">
      {isLoggedIn()}
      <Grid item>
        <Headers />
      </Grid>
      <Grid
        item
        container
        justify="center"
        spacing={4}
        className={classes.gridContainer}
      >
        <Grid item container>
          <Grid
            item
            container
            alignItems="baseline"
            justify="space-between"
            style={{ margin: "auto 5%" }}
          >
            <Typography variant="h6">
              Book
              <sub style={{ fontSize: ".5em" }}>({totalProducts} items)</sub>
            </Typography>
            <Grid item>
              <Dropdown clickHandler={dropDownOnClickHandler}/>
            </Grid>
          </Grid>
        </Grid>
        {products.map((item, index) => (
          <Grid item style={gridStyle}>
            <Item item={item} key={item.id} />
          </Grid>
        ))}
        {products && (
          <Grid item container justify="center">
            <Page handleChange={handleChange} page={pageNo} totalPage={totalPage} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    loginToken: state.login.response.message,
    newAccessToken: state.token.response.message,
    statusCode: state.token.response.statusCode 
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestToken: (refreshTokenURI) => dispatch(requestToken(refreshTokenURI)),
  requestCart: (token, bookStoreURI) => dispatch(requestCart(token, bookStoreURI))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsComponent);
