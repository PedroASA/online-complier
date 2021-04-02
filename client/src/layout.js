/*
  Exports MyNav, Jumb and MyTab.
  Three layout components.
*/

import React, { useState } from 'react'
import {
  Container,
  Navbar,
  Nav,
  Button,
  Image,
  Jumbotron,
  Col,
  Row,
  Tabs,
  Tab,
  InputGroup,
  Form
} from 'react-bootstrap'



// A navbar that sticks on the top of the window.
export class MyNav extends React.Component {
    
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
      
    handleChange = this.props.onBtnClick;

    render() {
        return (
               <Row> <Navbar bg="dark" variant="dark" fixed="top" fluid="true">
                    <Navbar.Brand href="#home"> Online Editor </Navbar.Brand>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link id="home-link" onClick={this.handleChange} > Home  </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
                </Row>
        )
    }
};

// A jumbotron to quickly present the app.  
export class Jumb extends React.Component {
    
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
      
    handleChange = this.props.onBtnClick;

    render() {
        return (
            <Jumbotron  id="Jumb" fluid>
                <Container fluid="md">
                    <Row>
                        <Col> <h1> Online Code Editor </h1> </Col>
                    </Row>
                    <Row id="img">
                        <Col> <Image src="logo192.png" /> </Col>
                    </Row>
                    <Row>
                        <Col>  
                        <hr></hr>
                        <p id="Jumb-text">
                    For now, an online editor for various programming languages. Eventually, an online complier and repl for programming languages.
                        </p>
                        </Col>
                    </Row>
                    <Row id="last-row">
                        <Col> 
                            <Button id="code-btn" variant="primary" size="lg" onClick={ this.handleChange }> Start Coding!</Button>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        )
    }
};



/*
  TODO:  Change active tab on submit.
*/
// A tab that switches between stdin, stdout and stderr. 
export function MyTab (props) {

    const handleSubmit = () => 
      props.onSubmit();
      
    const handleChange = e => 
      props.onChange(e);

    const [key, setKey] = useState(props.defKey);

  
    return (
      <Tabs activeKey={key} onSelect={k => setKey(k)}>
        <Tab eventKey="stdin" title="StdIn">
          <Row id="submit-row">
            <Col className="submit-col" sm={9}> 
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text> StdIn </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="textarea" rows={5} id="stdin" onChange={ handleChange } />
              </InputGroup>
            </Col>
              <Col className="submit-col" sm={3} > 
                <Button 
                    variant="primary" size="lg" 
                    onClick={ handleSubmit } 
                    id="submit-btn"
                    disabled={props.disabled}
                  > Submit!</Button>
              </Col>
          </Row>
        </Tab>
        <Tab eventKey="stdout" title="StdOut" disabled={!props.stdOut}>
          <Row>
            <Col className="submit-col" xs={12}> 
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text> StdOut </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="textarea" rows={6} readOnly value={props.stdOut} id="stdout"/>
              </InputGroup>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="stderr" title="StdErr" disabled={!props.stdErr}> 
        <Row>
          <Col className="submit-col" xs={12}> 
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text> StdErr </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="textarea" rows={6} readOnly  value={props.stdErr} id="stderr"/>
            </InputGroup>
          </Col>
        </Row>
      </Tab>
    </Tabs>
    )
  }