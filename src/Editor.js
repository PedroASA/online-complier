import React from 'react';

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.ref = React.createRef()
    this.state = {
      message: this.props.message
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  render() {
    return (
      <div>
        <textarea id="code" onChange={this.handleChange}
          value={this.state.message} 
        />
        <PrismCode
          code={this.state.message}
          language={this.props.lang}
          plugins={["line-numbers"]}
        /> 
      </div>
      
    )
  }
};
  
const Prism = require('prismjs');

class PrismCode extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  componentDidMount() {
    this.highlight()
  }
  componentDidUpdate() {
    this.highlight()
  }
  highlight = () => {
    if (this.ref && this.ref.current) {
      console.log(this.ref.current);
      Prism.highlightElement(this.ref.current)
    }
  }
  render() {
    const {code, plugins, language } = this.props
    return (
      <pre className={!plugins ? "" : plugins.join(" ")}>
        <code ref={this.ref} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    )
  }
};

export default Editor;