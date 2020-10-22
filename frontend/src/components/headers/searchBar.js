import React from "react";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typed from "react-typed";
import { Input } from "@material-ui/core";
import axios from 'axios';
import './header.css';


export default function SearchBar() {
  const [ searchResult, setSearchResult ] = React.useState([{"_source":{"title":""}}])
  const [ inputField, setInputField ] = React.useState("")
  const [ toggle, setToggle ] = React.useState(false)
  const inputRef = React.useRef()

  const handleChange = (e) => {
    setInputField(e.target.value)
    axios.get(process.env.REACT_APP_BACKENDURI+"products/search",{params:{"query":e.target.value}})
    .then(res=>setSearchResult([...res.data])).catch(err=>console.log(err.response))      
  }
  const selectHandler = (e) =>{
    setSearchResult([{"_source":{"title":""}}])
    setInputField(e.target.textContent)
  }

  React.useEffect(()=>{
    document.addEventListener('mousedown', handleClick)
    return ()=>{
      document.removeEventListener('mousedown', handleClick)
    }
  },[])

  const handleClick = (e)=>{
    // if(!inputRef.contains(e.target)){
      setToggle(!toggle)
    
  }

  return (
    <div className="autocomplete">
      <TextField
      value={inputField}
      onChange = {handleChange}
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
        }
      }
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
      {toggle &&
      <div className="autocompleteItems">
      {searchResult.map((item) =>  <p className="autocompleteItem" onClick={(e)=>{selectHandler(e)}} >{item._source.title && String(item._source.title)}</p>)}
      </div>
      }
      </div>

  );
  
}

// /* eslint-disable no-use-before-define */
// import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import axios from 'axios';

// export default function SearchBar() {
//   const [ searchResult, setSearchResult ] = React.useState([{"_source":{"title":""}}])

//   const handleChange = (e) => {
//     axios.get(process.env.REACT_APP_BACKENDURI+"products/search",{params:{"query":e.target.value}})
//     .then(res=>setSearchResult([...res.data])).catch(err=>console.log(err.response))
      
//   }

//   return (
//     <div style={{   }}>
//     {/* {searchResult.map((item) => item._source.title)} */}
//       <Autocomplete
//         freeSolo
//         id="free-solo-2-demo"
//         disableClearable
//         options={searchResult.map((item) =>  item._source.title && String(item._source.title))}
//         renderInput={(params) => (
//           <TextField
//             onChange = {handleChange}
//             {...params}
//             label="Search input"
//             // margin="normal"
//             variant="outlined"
//             InputProps={{ ...params.InputProps, type: 'search' }}
//           />
//         )}
//       />
//     </div>
//   );
// }
