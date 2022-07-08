import React from 'react';
import './App.css';
import Provider from './context/myProvider';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default App;
