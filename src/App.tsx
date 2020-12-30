import React from 'react';
import './App.less';
import { ShowCard } from './components/showCard'
import StressTest from'./components/materialUi'
function App() {
  return (
    <div className="App">
      <ShowCard />
      <StressTest />
    </div>
  );
}

export default App;
