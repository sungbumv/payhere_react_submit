import React,{useState} from 'react';
import './App.css';
import AxiosAPI from './context/AxiosAPI';





function App() {
  let [inputData, inputDataChange] = useState('');
  
  return (
    <div className="App">
      <input onChange= { (e)=>{inputDataChange(e.target.value)} }/>
      <h3>{inputData}</h3>
      <AxiosAPI/>
    </div>
  );
}

export default App;
