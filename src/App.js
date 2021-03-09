import './App.css';
import Editor from './editor';
import {MyNav, Jumb} from './layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      show: true
    };
    this.show = this.show.bind(this);
  }

  show = () => {
    this.setState({ show: true });
  }

  hide = () => {
    this.setState({ show: false });
  }

  render () {
    return (
      <div className="App">
          <header className="App-header">
          <MyNav onBtnClick={ this.show } />
          {this.state.show ?  
            <Jumb onBtnClick={ this.hide } />
          : 
            <Editor mode='clike' />
          }
          </header>
      </div>
    )
  }
};

export default App;
