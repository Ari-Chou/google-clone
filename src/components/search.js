import React, { useState } from "react";
import "./search.css";
import { useStateValue } from "../store/stateProvider";
import { actionTypes } from "../constants/constants";

import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

function Search({ hideButtons = false }) {
  const [input, setInput] = useState("");
  const [{}, dispatch] = useStateValue();
  const history = useHistory();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearchButton = (e) => {
    e.preventDefault();

    //Dispatch action
    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: input,
    });

    history.push("/search");
  };

  return (
    <form className="search">
      <div className="search__input">
        <SearchIcon className="search__inputIcon" />
        <input type="text" value={input} onChange={handleInputChange} />
        <MicIcon />
      </div>

      {/* Reuse the element dependent on the hideButtons pros */}
      {!hideButtons ? (
        <div className="search__buttons">
          <Button variant="outlined" type="submit" onClick={handleSearchButton}>
            Google Search
          </Button>
          <Button variant="outlined">I'm Feeling Lucky</Button>
        </div>
      ) : (
        <div className="search__buttons">
          <Button
            className="search__buttonHidden"
            variant="outlined"
            type="submit"
            onClick={handleSearchButton}
          >
            Google Search
          </Button>
          <Button className="search__buttonHidden" variant="outlined">
            I'm Feeling Lucky
          </Button>
        </div>
      )}
    </form>
  );
}

export default Search;
