import React from "react";
import "./searchPage.css";
import { Link } from "react-router-dom";
import Search from "../components/search";
import { useStateValue } from "../store/stateProvider";
import useGoogleSearch from "../useGoogleSearch";
import SearchIcon from "@material-ui/icons/Search";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DescriptionIcon from "@material-ui/icons/Description";

import SearchResults from "../searchResults";

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();
  // this is live API Call
  const { data } = useGoogleSearch(term);
  console.log("searchData", data);
  // Mock API Call
  //const data = SearchResults;
  // console.log(data);
  console.log(term);

  return (
    <div className="searchPage">
      <div className="search__header">
        <Link to="/">
          <img
            className="search__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png"
            alt=""
          />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons />
          <div className="searchPage__options">
            <div className="searchPage__optionLeft">
              <div className="searchPage__option">
                <SearchIcon />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage__option">
                <DescriptionIcon />
                <Link to="/all">News</Link>
              </div>
              <div className="searchPage__option">
                <InsertPhotoIcon />
                <Link to="/all">Images</Link>
              </div>
              <div className="searchPage__option">
                <LocalOfferIcon />
                <Link to="/all">Shopping</Link>
              </div>
              <div className="searchPage__option">
                <RoomIcon />
                <Link to="/all">Maps</Link>
              </div>
              <div className="searchPage__option">
                <MoreHorizIcon />
                <Link to="/all">More</Link>
              </div>
            </div>
            <div className="searchPage__optionsRight">
              <div className="searchPage__option">
                <Link to="/setting">Setting</Link>
              </div>
              <div className="searchPage__option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {term && (
        <div className="search__results">
          <p className="searchPage__resultsCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.searchTime}) for {data?.context.title}
          </p>

          {data?.items.map((item) => {
            return (
              <div className="searchPage__result">
                <a href={item.link}>
                  {item.pagemap?.cse_image?.length > 0 &&
                    item.pagemap?.cse_image[0]?.src && (
                      <img
                        className="searchPage__resultImage"
                        src={
                          item.pagemap?.cse_image?.length > 0 &&
                          item.pagemap?.cse_image[0]?.src
                        }
                        alt=""
                      />
                    )}
                  {item.displayLink}
                </a>
                <a href={item.link} className="searchPage__resultTitle">
                  <h3>{item.title}</h3>
                </a>
                <p className="searchPage__resultSnippet">{item.snippet}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
