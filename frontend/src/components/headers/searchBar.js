import React from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typed from "react-typed";

export default function SearchBar() {
  return (
    <TextField
      style={{ background: "white", borderRadius: "3px", width: "100%" }}
      variant="standard"
      id="input-with-icon-textfield"
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
