import React from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import {
  Nav,
  NavDropdown,
} from 'react-bootstrap'

import {MyTab} from './layout';
import modes from './modes';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css');
require('codemirror/mode/clike/clike');


class Editor extends React.Component {

  constructor(props) {
    super(props);
    const mode = this.props.mode || 'javascript';
    this.state = {
      mode   : mode,
      code   : modes[mode],
      stdIn  : "",
      stdOut : "",
      stdErr : ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  handleSubmit = () => {
    fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { code     : this.state.code, 
                language : this.state.mode,
                stdIn    : this.input
              }
    })
    .then(response => response.json())
    .then(data => {
      this.setState(() => ({
        stdOut : data.stdOut,
        stdErr : data.stdErr
      }));

    })
    .catch((error) => {
        console.error('Error:', error);
    });
  };

  changeMode = (mode_name) => {
    this.setState(() => ({
      code: modes[mode_name],
      mode: mode_name
    }));
  };

  render() {

    return (
        <div id="Editor">
          <Nav className="justify-content-end">
            <NavDropdown title="Language" id="nav-lang" activekey={this.state.mode} onSelect={this.changeMode}>
                {Object.keys(modes).map((mode) =>
                    <NavDropdown.Item eventKey={mode} key={mode}> {mode} </NavDropdown.Item>
                  )}
            </NavDropdown>
          </Nav>
            <CodeMirror
              value={this.state.code}
              options={{
                mode: this.state.mode,
                theme: 'material',
                lineNumbers: true
              }}
              scroll={{
                x: 50,
                y: 50
              }}
            />
            <MyTab onSubmit={ this.handleSubmit } 
            stdOut={this.state.stdOut} 
            stdErr={this.state.stdErr} 
            defKey={this.state.stdErr ? "stderr" : this.state.stdOut ? "stdout" :"stdin"}  />
        </div>
    )
  }
};




export default Editor;