/*
  Editor Component.
  Composed by a NavSelect, from which to choose language,
  a CodeMirror editor
  and a MyTab component.

*/

import React from 'react';
import {
  Nav,
  NavDropdown,
  NavItem,
  NavLink
} from 'react-bootstrap'
import {MyTab} from './layout';

// import codemirror settings.
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

  
class Editor extends React.Component {

  constructor(props) {

    // start modes with only a single language: javascript.
    super(props);
    this.state = {
      modes  : {'javascript' : ['// Type your code here!', 'js']},
      mode   : props.mode || 'javascript',
      code   : props.code || '// Type your code here!',
      stdIn  : "",
      stdOut : "",
      stdErr : "",
      defKey : 'stdin'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeMode = this.changeMode.bind(this);

  }

  // After the component has mounted, get all supported modes from the api.
  componentDidMount() {
    fetch('/code')
        .then(response => response.json())
        .then(data => {
          if(data['javascript'])
            this.setState(() => ({
              modes : data
            }));
          else 
            throw Error("Data receveid is not compatible with expected response.");
        }
        )
        .catch(error => console.log(error));
  }

  /* 
    Called when the #submit-btn is clicked. 
    POST code in the api and update state with its response.
  */
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

    })
    .catch((error) => {
        console.error('Error:', error);
    });
  };

  // When the NavSelect value changes, update state.mode.
  changeMode = (mode_name) => {
    this.setState(() => ({
      code: this.state.modes[mode_name][0],
      mode: mode_name
    }));
  };

  // when code is type in the codeMirror editor, update state.code.
  updateCode = editor => {
    editor.save();
    this.setState(() => ({
      code: editor.getTextArea().value
    }))
  }


  render() {

    return (
        <div id="Editor">
          <Nav className="justify-content-center">
            <NavDropdown title="Language" as={NavItem} id="nav-lang" activekey={this.state.mode} onSelect={this.changeMode}>
                {Object.keys(this.state.modes).map((mode) =>
                    <NavDropdown.Item id={`link-${mode}`} as={NavLink} eventKey={mode} key={mode}> {mode} </NavDropdown.Item>
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
                mode: this.state.mode,
              }}
              onChange={this.updateCode.bind(this)}
            />
          </div>
            <MyTab onSubmit={ this.handleSubmit } 
            onChange= { e => {
              this.setState(() => ({
                stdIn: e.target.value
              }))
            } }
            disabled= {!this.state.modes[this.state.mode] || this.state.modes[this.state.mode].length === 1}
            stdOut={this.state.stdOut} 
            stdErr={this.state.stdErr} 
            defKey={this.state.defKey}  />
        </div>
    )
  }
};




export default Editor;