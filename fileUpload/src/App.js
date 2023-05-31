import logo from './logo.svg';
import './App.css';
import FileUpload from './fileUploader'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className='App-body'>
          <div><FileUpload/></div>
      </body>
    </div>
  );
}

export default App;
