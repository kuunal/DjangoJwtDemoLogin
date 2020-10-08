import React from "react";
import { AppBar, Grid, IconButton, Toolbar } from "@material-ui/core";
import Logo from "./bookStoreLogo";
import SearchBar from "./searchBar";
import CartIcon from "./cartIcon";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import WishListIcon from "./wishListIcon";
import UserProfile from "./userProfile";
// import Typed  from "react-typed";

export default function Headers() {
  const theme = useTheme();
  const isXSWidth = useMediaQuery(theme.breakpoints.down("xs"));

  const logoStyle = {
    marginLeft: isXSWidth ? "-20px" : "-50px",
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          alignItems={isXSWidth ? "stretch" : "center"}
          direction={isXSWidth ? "column" : "row"}
          style={isXSWidth ? { marginBottom: "10%" } : {}}
        >
          <Grid item container style={{ width: "80%" }}>
            <Grid lg={1} xl={1}></Grid>
            <Grid item>
              <Logo />
            </Grid>
            <Grid item lg={6}>
              <SearchBar />
            </Grid>
          </Grid>
          <Grid item container style={{ width: "20%" }} justify="flex-start">
            <Grid item>
              <WishListIcon></WishListIcon>
            </Grid>
            <Grid item>
              <CartIcon />
            </Grid>
            <Grid item>
              <UserProfile />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
