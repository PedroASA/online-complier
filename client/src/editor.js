import React from 'react';

import {
  Button,
  Nav,
  NavDropdown,
  NavItem,
  NavLink
} from 'react-bootstrap'

import {MyTab} from './layout';
import MonacoEditor from 'react-monaco-editor';

// var modes;
// const res = fetch('/code')
//     .then(response => response.json())
//     .then(data => modes= data)
//     .catch(error => console.log(error));
var modes = {
  'javascript' : ["// Type your code here!", 'js'],
  'cpp'   : ["// Type your code here!", "cpp"],
  'haskell' : ['-- Type your code here!', 'hs'],
  'json'    : ['{\n\t"body" : {\n\n\t}\n}'],
  'html'    : ['<!-- Leave your marks here! -->'],
  'css'     : ['/* Style freely */'],
  'markdown': ['### Title']
};

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
      stdErr : "",
      defKey : 'stdin'
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
        stdErr : data.stdErr,
        defKey : data.stdErr ? 'stderr' : data.stdOut ?  'stdout' : 'stdin'
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

    const options = {
      selectOnLineNumbers: true
    };

    return (
        <div id="Editor">
          <Nav className="justify-content-center">
            <NavDropdown title="Language" as={NavItem} id="nav-lang" activekey={this.state.mode} onSelect={this.changeMode}>
                {Object.keys(modes).map((mode) =>
                    <NavDropdown.Item as={NavLink} eventKey={mode} key={mode}> {mode} </NavDropdown.Item>
                  )}
            </NavDropdown>
          </Nav>
            <MonacoEditor
              language={this.state.mode}
              theme="vs-dark"
              value={this.state.code}
              options={options}
              onChange={(value, e)  => 
                this.setState(() => ({
                  code: value,
                }))}
            />

            <MyTab onSubmit={ this.handleSubmit } 
            disabled= {modes[this.state.mode].length == 1}
            stdOut={this.state.stdOut} 
            stdErr={this.state.stdErr} 
            defKey={this.state.defKey}  />
        </div>
    )
  }
};




export default Editor;