import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import PokemonsList from './pages/PokemonsList';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PokemonsList />
      </Provider>
    );
  }
}

export default App;
