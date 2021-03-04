import React from 'react'
import {
  Container,
//   Form,
//   FormControl,
  Navbar,
  Nav,
  Button,
  Image,
  Jumbotron,
  Col,
  Row
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
                            <Nav.Link onClick={this.handleChange} > Home  </Nav.Link>
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
