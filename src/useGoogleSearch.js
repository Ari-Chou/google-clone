import axios from "axios";
import React, { useEffect, useState } from "react";
import API_KEY from "./API_KEY";

const CONTEXT_KEY = "01e5db6676958ba01";

const useGoogleSearch = (term) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSearchData = () => {
      fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        });
    };
    fetchSearchData();
  }, [term]);

  return { data };
};

export default useGoogleSearch;
