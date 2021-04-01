import React from 'react';
import {
  Nav,
  NavDropdown,
  NavItem,
  NavLink
} from 'react-bootstrap'
import {MyTab} from './layout';

import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

var modes = {
  'javascript' : ['// Type your code here!', 'js']
};
  
class Editor extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      mode   : 'javascript',
      code   : modes['javascript'][0],
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
            stdIn    : this.state.stdIn
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


  componentDidMount() {
    fetch('/code')
        .then(response => response.json())
        .then(data => modes = data)
        .catch(error => console.log(error));
  }


  render() {

    return (
        <div id="Editor">
          <Nav className="justify-content-center">
            <NavDropdown title="Language" as={NavItem} id="nav-lang" activekey={this.state.mode} onSelect={this.changeMode}>
                {Object.keys(modes).map((mode) =>
                    <NavDropdown.Item as={NavLink} eventKey={mode} key={mode}> {mode} </NavDropdown.Item>
                  )}
            </NavDropdown>
          </Nav>
          <div id="codeMirror-container">
            <CodeMirror
              language={this.state.mode}
              theme="vs-dark"
              value={this.state.code}
              options={{
                theme: 'monokai',
                tabSize: 4,
                keyMap: 'sublime',
                mode: 'jsx',
              }}
              // onChange={(value, e)  => 
              //   this.setState(() => ({
              //     code: value,
              //   }))}
            />
          </div>
            <MyTab onSubmit={ this.handleSubmit } 
            onChange= { e => {
              this.setState(() => ({
                stdIn: e.target.value
              }))
            } }
            disabled= {modes[this.state.mode].length === 1}
            stdOut={this.state.stdOut} 
            stdErr={this.state.stdErr} 
            defKey={this.state.defKey}  />
        </div>
    )
  }
};




export default Editor;