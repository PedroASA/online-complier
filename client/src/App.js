/*
  Component that contains the entire application.
  Implements the logic of hiding and showing the Editor.
*/

import './App.css';
import Editor from './editor';
import {MyNav, Jumb} from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function App (props) {

  const [show, setShow] = useState(false);

  return (
    <div className="App">
        <header className="App-header">
        <MyNav onBtnClick={ () => setShow(false) } /> 
        <Jumb onBtnClick={ () => setShow(true) } />
        {show ?  <Editor /> :  <span /> }
        </header>
    </div>
  )
};

export default App;
