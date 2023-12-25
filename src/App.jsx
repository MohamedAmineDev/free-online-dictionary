import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
function App() {
  const [word, setWord] = React.useState('');
  function handleWord(e) {
    setWord(e.target.value);
    console.log(e.target.value);
  }
  return (
    <>
      <Header />
      <Search word={word} handleSearch={handleWord} />
      <Footer />
    </>
  )
}

export default App
