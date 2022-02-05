import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const initialList = [];

  const [texts, setTexts] = useState(initialList);

  function sendToDb() {

    axios.post('/add', {
      text: input
    }).then(res => {
      fetchFromDb()
      console.log(res);
    }).catch(e => {
      console.log(e);
    });

    setInput("");

  }

  function fetchFromDb() {
    fetch("/fetch")
      .then(response => response.json())
      .then(data => setTexts(data.texts));
  }

  function clear() {
    axios.delete("/delete")
      .then(res => {
        console.log(res);
        setTexts([])
      })
      .catch(e => {
        console.log(e);
      });

      setInput("");

  }

  return (
    <div className="App">
      <header className="App-header">
        Group 20 Software Containerization Project Application
      </header>
      <div className="Grid">
        <div className="Grid-Item">
          <input type="Enter text here" value={input} onInput={e => setInput(e.target.value)} />
          <button onClick={sendToDb}> Add </button>
          <button onClick={clear}>Clear</button>
        </div>
        <div className="Grid-Item">
          {texts.map(text => {
            return <li key={text.text}>{text.text}</li>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
