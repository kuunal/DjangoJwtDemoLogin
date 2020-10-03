import React from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Grid,
  IconButton,
  Button,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function headers() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item sm={1} md={1} lg={2} />
          <Button startIcon={<MenuBookIcon />}>
            <Grid container>
              <Grid item>
                <Typography>BookStore</Typography>
              </Grid>
            </Grid>
          </Button>
          <Grid item>
            <TextField
              // className={classes.margin}
              variant="outlined"
              id="input-with-icon-textfield"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
