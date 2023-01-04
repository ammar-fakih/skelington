import React from 'react';
import AppEntry from './App/Components/App';
import { store } from './App/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  );
}
