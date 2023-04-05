import {
    Button,
    TextField,
  } from "@mui/material";
  import "./Search.css";
  import { useState } from "react";
  import axios from "axios";
  import SingleContent from "../../component/SingleContent/SingleContent";
  import SearchIcon from '@mui/icons-material/Search';
  
  const Search = () => {
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState([]);

  
    const fetchSearch = async () => {
      try {
      const { data } = await axios.get(
        `http://localhost:3001/api/search/${searchText}`
      );
      console.log(data)  
      setContent(data.results);
    } catch (error) {
      console.error(error);
    }
    };

  
    return (
      <div>
          <div className="search">
            <TextField
              style={{ flex: 1 ,backgroundColor: 'aliceblue'}}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)
              }
            />
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 ,backgroundColor: 'black'}}
            >
              <SearchIcon />
            </Button>
          </div>
        <div className="trending">
          {content &&
            content.map((c:any) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
              />
            ))}
        </div>
      </div>
    );
  };
  
  export default Search;