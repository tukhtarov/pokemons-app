import { takeLatest } from 'redux-saga';

import ActionTypes from '../constants';

import getPokemonsList from './getPokemonsList';



export default function* rootSaga() {
  yield takeLatest(ActionTypes.GET_POKEMONS_LIST, getPokemonsList);
}