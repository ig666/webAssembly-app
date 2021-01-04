import React from 'react';
import './App.less';
import { Provider } from 'mobx-react';
import { CreateStores } from './store/createStores'
import AppRouter from './layout/index'
import UseMobx from './components/useMobx'

function App() {
  const store = CreateStores()
  return (
    <Provider {...store}>
      <div className='App'>
        <AppRouter />
      </div>
    </Provider>
      // <Provider { ...store }>
      //   <div className="App">
      //     {/* <ShowCard />
      //   <StressTest /> */ }
      //     <UseMobx/>
      //   </div>
      // </Provider>
  );
}

export default App;
