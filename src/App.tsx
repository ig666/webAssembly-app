import React from 'react';
import './App.less';
// import { ShowCard } from './components/showCard'
// import StressTest from './components/materialUi'
import MyState from './store/countNum'
import UseMobx from './components/useMobx'

interface MyStateProps {
  num1?: number,
  num2?: number,
  addNum1?: Function,
  addNum2?: Function,
  total?:number,
}
export const StoreContext = React.createContext<MyStateProps>({})
function App() {
  const mystate = new MyState()
  return (
    <StoreContext.Provider value={mystate}>
      <div className="App">
        {/* <ShowCard />
        <StressTest /> */}
        <UseMobx />
      </div>
    </ StoreContext.Provider>
  );
}

export default App;
