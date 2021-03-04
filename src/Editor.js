import React from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import {
  Nav,
  NavDropdown
} from 'react-bootstrap'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/clike/clike.js');


const modes = {
  1 : 'javascript',
  2 : 'css',
  3 : 'xml',
  4 : 'clike'
};

const messages = {
  1 : "// Type your code here!",
  2 : '/* Style here! */',
  3 : '<!-- Leave your marks here! -->',
  4 : "// Type your code here!"
};


class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code: "// Type your code here!",
      mode: "javascript"
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  handleChange = (val) => {
    this.setState(() => ({
      code: val
    }));
  }

  changeMode = (index) => {
    this.setState(() => ({
      code: messages[index],
      mode: modes[index]
    }));
  }


  render() {

    return (
        <div id="Editor">
          <Nav className="justify-content-end">
            <NavDropdown title="Language" id="nav-dropdown" activeKey="1" onSelect={this.changeMode} >
              <NavDropdown.Item eventKey="1"> JavaScript </NavDropdown.Item>
              <NavDropdown.Item eventKey="2"> CSS </NavDropdown.Item>
              <NavDropdown.Item eventKey="3"> XML </NavDropdown.Item>
              <NavDropdown.Item eventKey="4"> C </NavDropdown.Item>
              <NavDropdown.Item eventKey="4"> C++ </NavDropdown.Item>
              <NavDropdown.Item eventKey="4"> Java </NavDropdown.Item>
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
              onChange={(editor, data, value) => {
                this.handleChange(value);
              }}
            />
        </div>
    )
  }
};


export default Editor;