import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import axios from "axios";
const APIURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const storageName = "word";
const ACTIONS = {
  START_FETCHING_DATA: 'Is loading',
  DATA_FETCHED: 'Data is fetched successfully',
  DATA_NOT_FETCHED: 'An error has occured'
};
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_FETCHING_DATA: {
      return { ...state, isLoading: true, error: false };
    }
    case ACTIONS.DATA_FETCHED: {
      return { ...state, isLoading: false, error: false, data: action.payload };
    }
    case ACTIONS.DATA_NOT_FETCHED: {
      return { ...state, isLoading: false, error: true, data: [] };
    }
    default:
      return state;
  }
}
function App() {
  const [word, setWord] = React.useState(localStorage.getItem(storageName) || "Hello");
  const [url, setUrl] = React.useState('');
  const [state, dispatch] = React.useReducer(reducer, { isLoading: false, error: false, data: [] });
  function handleWord(e) {
    setWord(e.target.value);

  }
  React.useEffect(() => {
    if (word != "") {
      setUrl(`${APIURL}${word}`);
      localStorage.setItem(storageName, word);
    }
  }, [word]);
  async function doSearch() {
    dispatch({ type: ACTIONS.START_FETCHING_DATA });

    try {
      const response = await axios.get(`${url}`);
      //console.log();
      dispatch({ type: ACTIONS.DATA_FETCHED, payload: response.data[0].meanings });
    } catch (error) {
      dispatch({ type: ACTIONS.DATA_NOT_FETCHED });
    }
  };

  return (
    <>
      <Header />
      <Search word={word} handleSearch={handleWord} doSearch={doSearch} />
      <Footer />
    </>
  )
}

export default App
