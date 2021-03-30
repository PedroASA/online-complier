import React from 'react';

import {
  Nav,
  NavDropdown,
} from 'react-bootstrap'

import {MyTab} from './layout';
import MonacoEditor from 'react-monaco-editor';

var modes;
const res = fetch('/code')
    .then(response => response.json())
    .then(data => modes= data)
    .catch(error => console.log(error));


class Editor extends React.Component {

  constructor(props) {
    super(props);
    const mode = this.props.mode || 'javascript';
    // getModes();
    this.state = {
      mode   : mode,
      code   : modes[mode][0],
      stdIn  : "",
      stdOut : "",
      stdErr : ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  handleSubmit = () => {
    fetch('/code', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          { code     : this.state.code, 
            language : this.state.mode,
            stdIn    : this.input
          })
    })
    .then(response => response.json())
    .then(data => {
      this.setState(() => ({
        stdOut : data.stdOut,
        stdErr : data.stdErr
      }));
      console.log(data);

    })
    .catch((error) => {
        console.error('Error:', error);
    });
  };

  changeMode = (mode_name) => {
    this.setState(() => ({
      code: modes[mode_name][0],
      mode: mode_name
    }));
  };

  render() {

    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };

    return (
        <div id="Editor">
          <Nav className="justify-content-end">
            <NavDropdown title="Language" id="nav-lang" activekey={this.state.mode} onSelect={this.changeMode}>
                {Object.keys(modes).map((mode) =>
                    <NavDropdown.Item eventKey={mode} key={mode}> {mode} </NavDropdown.Item>
                  )}
            </NavDropdown>
          </Nav>
            <MonacoEditor
              language="javascript"
              theme="vs-dark"
              value={code}
              options={options}
              onChange={(value, e)  => 
                this.setState(() => ({
                  code: value,
                }))}
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