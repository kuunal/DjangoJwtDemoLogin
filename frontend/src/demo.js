import React, { useState, useEffect } from "react";
import axios from "axios";

function Demo() {
  const [token, setToken] = useState("");
  useEffect(() => {
    // axios.get("http://localhost:8000/products/?pageno=1",{"headers":{"x-token":"res.data.access"}}).then(res=>console.log(res.data))
    axios
      .post(
        "http://localhost:8000/login/",
        { email: "kunaldeshmukh2503@gmail.com", password: "Kunal@123" },
        { withCredentials: true }
      )
      .then((res) =>
        axios
          .get("http://localhost:8000/products/?pageno=1", {
            headers: { "x-token": res.data.access },
          })
          .then((res) => console.log(res.data))
      );
  }, []);
  return (
    <div>
      {token}
      {/* <button type="submit" onClick={get_products}>PRoducts</button> */}
      Hello
    </div>
  );
}
export default Demo;
