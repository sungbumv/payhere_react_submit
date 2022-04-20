import React,{useState} from 'react';
import './App.css';
import AxiosAPI from './context/AxiosAPI';

function App() {
  let [inputData, inputDataChange] = useState('');
  let [buttonEnterFg, buttonEnterFgChange] = useState(false);
  return (
    <div className="App">
      <input onChange= { (e)=>{inputDataChange(e.target.value)} }/>
      <h3>{inputData}</h3>
      <button onClick={()=>{buttonEnterFgChange(true)}}>버튼 입력</button>
    {
        buttonEnterFg == true ? <AxiosAPI inputRepo = {inputData}/> : null    //버튼 플래그를 통해 inputData 전송 
    }
    </div>
  );
}

export default App;
