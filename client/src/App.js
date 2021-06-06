/*
  Component that contains the entire application.
  Implements the logic of hiding and showing the Editor.
*/

import './App.css';
import Editor from './editor';
import {Jumb} from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import {
  Navbar,
  Nav,
  Row,
} from 'react-bootstrap'

import {FileList, File} from "./files";

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

  const Home = () => {
    return (
      <div>
        <Jumb onBtnClick={ load_editor } /> 
        <div id='editor-container'> 
          {show &&
              <Editor /> 
          }
        </div>
      </div>
    )
  }

  return (
    <Router>
    <div className="App">
      <header ref={focusedEl} className="App-header">
            <Row> 
              <Navbar bg="dark" variant="dark" fixed="top" fluid="true">
                <Navbar.Brand href="#home"> Online Editor </Navbar.Brand>
                <Nav>
                  <Nav.Item>
                    <NavLink onClick = {drop_editor} id="home-link" to="/">Home</NavLink> 
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink to="/all-files"> All Files </NavLink> 
                  </Nav.Item>
                </Nav>
              </Navbar>
            </Row>

        <Switch>
          <Route exact path="/" component={Home}>
          </Route>

          <Route path="/all-files" component={FileList}>
          </Route>

          <Route path="/editor" component={File}>
          </Route>

        </Switch>
    </header>
    </div>
    </Router>
  )
};

export default App;