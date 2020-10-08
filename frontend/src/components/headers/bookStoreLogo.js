import React from "react";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { Button, Grid, Typography } from "@material-ui/core";

export default function headerLogo() {
  return (
    <>
      <Button startIcon={<MenuBookIcon />}>
        <Typography>BookStore</Typography>
      </Button>
    </>
  );
}
