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
                        {/* <Nav.Link href="#features"> All Codes </Nav.Link>
                        <Nav.Link href="#pricing"> My Codes </Nav.Link> */}
                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form> */}
                </Navbar>
                </Row>
        )
    }
};

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
    Change active tab on submit.
*/
export function MyTab (props) {

    const handleSubmit = () => 
      props.onSubmit();
    
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
                <Form.Control as="textarea" rows={5} id="stdin"/>
              </InputGroup>
            </Col>
              <Col className="submit-col" sm={3} > 
                <Button 
                    variant="primary" size="lg" 
                    onClick={ handleSubmit } 
                    id="submit-btn"
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