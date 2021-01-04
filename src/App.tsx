import React from 'react';
import './App.less';
import { Provider } from 'mobx-react';
import { CreateStores } from './store/createStores'
import AppRouter from './layout/index'

function App() {
  const store = CreateStores()
  return (
    <Provider {...store}>
      <div className='App'>
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
