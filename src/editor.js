import React from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import {
  Nav,
  NavDropdown,
  Button,
  Row,
  Col,
  InputGroup,
  Tab,
  Tabs,
  Form
} from 'react-bootstrap'

import modes from './modes';

/*
  - Lift Up State from MyTab to Editor
  - Handle Code Submission
*/

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

  handleSubmit = () => {
    fetch('https://run.mocky.io/v3/466b6d99-4871-46b9-9395-2bd4bb0c5c2c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { code     : this.state.code, 
                language : this.state.mode,
                stdIn    : this.input
              },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);

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
            <MyTab />
        </div>
    )
  }
};


function MyTab () {
  return (
    <Tabs defaultActiveKey="stdin" id="uncontrolled-tab-example">
      <Tab eventKey="stdin" title="StdIn">
        <Row id="submit-row">
          <Col className="submit-col" xs={9}> 
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text> StdIn </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="textarea" rows={5} />
            </InputGroup>
          </Col>
            <Col className="submit-col" xs={3} > 
              <Button 
                  variant="primary" size="lg" 
                  onClick={ this.handleSubmit } 
                > Submit!</Button>
            </Col>
        </Row>
      </Tab>
      <Tab eventKey="stdout" title="StdOut">
        <Row>
          <Col className="submit-col" xs={12}> 
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text> StdOut </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="textarea" rows={6} readOnly />
            </InputGroup>
          </Col>
        </Row>
      </Tab>
      <Tab eventKey="stderr" title="StdErr" disabled>
      <Row>
        <Col className="submit-col" xs={12}> 
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text> StdOut </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="textarea" rows={6} readOnly />
          </InputGroup>
        </Col>
      </Row>
    </Tab>
  </Tabs>
  )
}



export default Editor;