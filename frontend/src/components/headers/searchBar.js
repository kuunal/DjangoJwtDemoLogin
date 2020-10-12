import React from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typed from "react-typed";
import { Input } from "@material-ui/core";

export default function SearchBar() {
  return (
    <TextField
      style={{
        background: "white",
        borderRadius: "3px",
        width: "100%",
        padding: "2px",
      }}
      variant="standard"
      id="input-with-icon-textfield"
      placeholder="search"
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      // />
      // <Typed
      //   strings={["Three mistakes of my life", "Rich dad poor dad", ""]}
      //   backSpeed={20}
      //   typeSpeed={30}
      // >
      //   <input
      //     type="text"
      //     style={{
      //       background: "white",
      //       borderRadius: "3px",
      //       width: "100%",
      //       height: "80%",
      //       border: "none",
      //     }}
      //     placeholder="search"
      // </Typed>
    />
  );
}
