import React from "react";
import { Pagination } from "@material-ui/lab";

export default function Page(props) {
  return (
    <div>
      <Pagination
        color="primary"
        count={props.totalPage}
        siblingCount={0}
        boundaryCount={2}
        onChange={props.handleChange}
      />
    </div>
  );
}
