import './App.css';
//import { useState, useEffect } from 'react';
//import styled from 'styled-components';

import DishAll from './DishAll';
import DishSearch from './DishSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">Dishes</header>
      <DishAll />
      <DishSearch />
    </div>
  );
}

export default App;
