import React from 'react';
import './App.css';
import { Provide, createState } from './state/RxState'
import reducer$ from './reducers'
import Counter from './components/Counter'

function App() {
  return (
    <Provide state$={createState(reducer$)}>
      <Counter />
    </Provide>
  );
}

export default App;
