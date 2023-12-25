import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import axios from "axios";
import ResponsePanel from './ResponsePanel';
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
      return { ...state, isLoading: true, error: false, data: null };
    }
    case ACTIONS.DATA_FETCHED: {
      return { ...state, isLoading: false, error: false, data: action.payload };
    }
    case ACTIONS.DATA_NOT_FETCHED: {
      return { ...state, isLoading: false, error: true, data: null };
    }
    default:
      return state;
  }
}
function App() {
  const [word, setWord] = React.useState(localStorage.getItem(storageName) || "Hello");
  const [url, setUrl] = React.useState('');
  const [state, dispatch] = React.useReducer(reducer, { isLoading: false, error: false, data: null });
  function handleWord(e) {
    setWord(e.target.value);
    e.preventDefault();

  }
  React.useEffect(() => {
    if (word != "") {
      setUrl(`${APIURL}${word}`);
      localStorage.setItem(storageName, word);
    }
  }, [word]);
  async function doSearch(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.START_FETCHING_DATA });

    try {
      const response = await axios.get(`${url}`);
      //const meanings = response.data[0].meanings.map(d=>d.definitions);
      const data = response.data[0].meanings
        .filter(d => d.partOfSpeech == 'noun' || d.partOfSpeech == 'verb' || d.partOfSpeech == 'adjective' || d.partOfSpeech == 'interjection')
        .map(d => {
          if( d.definition ){
            return {
              partOfSpeech: d.partOfSpeech,
              definition: d.definition
            };
          }
          else{
            return {
              partOfSpeech: d.partOfSpeech,
              definition: d.definitions[0]
            };
          }
        });
      console.log(data);
      dispatch({ type: ACTIONS.DATA_FETCHED, payload: data });
    } catch (error) {
      dispatch({ type: ACTIONS.DATA_NOT_FETCHED });
    }
  };

  return (
    <>
      <Header />
      <Search word={word} handleSearch={handleWord} doSearch={doSearch} />
      <ResponsePanel isLoading={state.isLoading} error={state.error} data={state.data} />
      <Footer />
    </>
  )
}

export default App
