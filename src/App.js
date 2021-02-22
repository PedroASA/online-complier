import './App.css';
import Editor from './Editor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3> Haskell Online Compiler </h3>
        <Editor className="Editor" message="// Type your code here" lang="js"/>
      </header>
    </div>
  );
};

export default App;
