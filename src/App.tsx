import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AutoComplete } from './components/autoComplete';
import Button from './components/button';
import { Input } from './components/input';



function App() {
  return (
    <div className="App">

      {/* <Input type='text' label='check'></Input>
      <Button label='hell'></Button>
      <Button label='hell' styleType='primary'></Button> */}
      <AutoComplete></AutoComplete>
      <Routes>
        {/* <Route path="" element={ } />
        <Route path="" element={ } /> */}



      </Routes>
    </div>
  );
}

export default App;
