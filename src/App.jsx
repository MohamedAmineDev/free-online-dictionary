import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import axios from "axios";
import ResponsePanel from './ResponsePanel';
import _ from 'lodash';

const APIURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const storageNameOld = "old_word";
const storageNameNew = "new_word";
const ACTIONS = {
  START_FETCHING_DATA: 'Is loading',
  DATA_FETCHED: 'Data is fetched successfully',
  DATA_NOT_FETCHED: 'An error has occured',
  DATA_DELETE_ITEM: 'Delete an item from the list',
  DATA_SORT_ITEMS:'Sort items in alphabetic order'
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
    case ACTIONS.DATA_DELETE_ITEM: {
      const value = state.data[action.index].partOfSpeech;
      const newData = state.data.filter(d => d.partOfSpeech != value);
      return { ...state, isLoading: false, error: false, data: newData };
    }
    case ACTIONS.DATA_SORT_ITEMS: {
      const newData=_.sortBy(state.data,'partOfSpeech');
      return { ...state, isLoading: false, error: false, data: newData };
    }
    default:
      return state;
  }
}
function App() {
  const [state, dispatch] = React.useReducer(reducer, { isLoading: false, error: false, data: null });
  const [word, setWord] = React.useState(localStorage.getItem(storageNameNew) || "Hello");
  const [doTheSearch, setDoTheSearch] = React.useState(true);
  React.useEffect(() => {
    fetchData(word);
  }, [doTheSearch]);
  function handleWord(e) {
    setWord(e.target.value);
    e.preventDefault();
  }
  function formatData(response) {
    return response.data[0].meanings
      .filter(d => d.partOfSpeech == 'noun' || d.partOfSpeech == 'verb' || d.partOfSpeech == 'adjective' || d.partOfSpeech == 'interjection')
      .map(d => {
        if (d.definition) {
          return {
            partOfSpeech: d.partOfSpeech,
            definition: d.definition
          };
        }
        else {
          return {
            partOfSpeech: d.partOfSpeech,
            definition: d.definitions[0]
          };
        }
      });
  }
  async function fetchData(wordKey) {
    dispatch({ type: ACTIONS.START_FETCHING_DATA });

    try {
      const response = await axios.get(`${APIURL}${wordKey}`);
      const data = formatData(response);
      dispatch({ type: ACTIONS.DATA_FETCHED, payload: data });
      const newWord = localStorage.getItem(storageNameNew);
      if (newWord == null) {
        localStorage.setItem(storageNameNew, word);
        localStorage.setItem(storageNameOld, word);
      }
      else {
        if (word != newWord) {
          localStorage.setItem(storageNameOld, newWord);
          localStorage.setItem(storageNameNew, word);
        }
      }
    } catch (error) {
      dispatch({ type: ACTIONS.DATA_NOT_FETCHED });
    }
  }
  function doSearch(e) {
    e.preventDefault();
    fetchData(word);
  };
  function doLastSearch(e) {
    e.preventDefault();
    let lastWord = localStorage.getItem(storageNameOld);
    if (lastWord == null) {
      lastWord = 'Old';
      localStorage.setItem(storageNameOld, lastWord);
    }
    fetchData(lastWord);
  };


  return (
    <>
      <Header />
      <Search word={word} handleSearch={handleWord} doSearch={doSearch} doLastSearch={doLastSearch} />
      <ResponsePanel isLoading={state.isLoading} error={state.error} data={state.data} dispatch={dispatch} />
      <Footer />
    </>
  )
}
export { reducer, ACTIONS, App };
export default App;