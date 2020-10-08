import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { IconButton } from "@material-ui/core";

export default function cartIcon() {
  return (
    <IconButton>
      <ShoppingCartIcon />
    </IconButton>
  );
}
