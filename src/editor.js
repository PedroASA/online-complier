import React from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import {
  Nav,
  NavDropdown
} from 'react-bootstrap'

import modes from './modes';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/clike/clike.js');


class Editor extends React.Component {

  constructor(props) {
    super(props);
    const mode = this.props.mode || 'javascript';
    this.state = {
      mode: mode,
      code: modes[mode]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  handleSubmit = (val) => {
    this.setState(() => ({
      code: val
    }));
    // Submit Code.
  }

  changeMode = (mode_name) => {
    console.log(mode_name);
    this.setState(() => ({
      code: modes[mode_name],
      mode: mode_name
    }));
  }

  render() {

    return (
        <div id="Editor">
          <Nav className="justify-content-end">
            <NavDropdown title="Language" id="nav-dropdown" activekey={this.state.mode} onSelect={this.changeMode}>
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
        </div>
    )
  }
};


export default Editor;