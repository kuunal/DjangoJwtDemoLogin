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
  const [pageNo, setPageNo] = useState(window.sessionStorage.getItem("pageNo")?window.sessionStorage.getItem("pageNo"):"1");
  const productURI =
    process.env.REACT_APP_BACKENDURI + "products/";
  const [ lastItemValue, setLastItemValue ] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [ dropDownValue, setDropDownValue ] = useState(window.sessionStorage.getItem("sortby")?window.sessionStorage.getItem("sortby"):"id")
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
        {params:{"pageno": pageNo, "sortby": dropDownValue, "last_item_info":lastItemValue, 'itemCount':12},
        headers: { "x-token": newAccessToken } },
        { withCredentials: true }
      )
      .then((res) => {
        setProducts([...res.data.products]);
        setLastItemValue(res.data.products[res.data.products.length - 1][dropDownValue])
        setTotalPage(res.data.total_page);
        setTotalProducts(res.data.total_products);
      })

      .catch((res) => console.log(res.response));
  };

  const handleChange = (event, value) => {
    (value - dropDownValue !== 1) && setLastItemValue(null)
    setPageNo(value);
    window.sessionStorage.setItem("pageNo",value);
  };

  const isLoggedIn = () =>{

    if (statusCode === 401){
      return <Redirect to="/login/" />
    }
  }

  const dropDownOnClickHandler = (e)=>{
    sessionStorage.setItem("pageNo", 1)
    setPageNo(1)
    setDropDownValue(e.target.value)
    sessionStorage.setItem("sortby", e.target.value)
    setLastItemValue((e.target.value==="id" && e.target.value==="price") ? 0 : "")
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
            {console.log(lastItemValue, dropDownValue)}
            <Typography variant="h6">
              Book
              <sub style={{ fontSize: ".5em" }}>({totalProducts} items)</sub>
            </Typography>
            <Grid item>
              {console.log(dropDownValue)}
              <Dropdown clickHandler={dropDownOnClickHandler} dropDownValue={dropDownValue && dropDownValue!=="id"?dropDownValue:"relevance"}/>
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
