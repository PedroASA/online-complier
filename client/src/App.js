/*
  Component that contains the entire application.
  Implements the logic of hiding and showing the Editor.
*/

import './App.css';
import Editor from './editor';
import {MyNav, Jumb} from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';

function App (props) {

  const [show, setShow] = useState(false);
  const focusedEl = useRef(null);

  useEffect(() => {
    focusedEl.current.scrollIntoView();
  });

  const load_editor = () => {
    setShow(true);
    focusedEl.current = document.querySelector('#editor-container');
  };

  const drop_editor = () => {
    setShow(false);
    focusedEl.current = document.querySelector('.App-header');
  };

  return (
    <div className="App">
        <header ref={focusedEl} className="App-header">
          <MyNav onBtnClick={ drop_editor } /> 
          <Jumb onBtnClick={ load_editor } /> 
          <div id='editor-container'> 
          {show &&
               <Editor /> 
          }
          </div> 
        </header>
    </div>
  )
};

export default App;