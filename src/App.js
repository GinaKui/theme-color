import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import './App.css';

function App() {
  return (
    <div className="App">
      <Palette colors={seedColors[0].colors} />
    </div>
  );
}

export default App;
