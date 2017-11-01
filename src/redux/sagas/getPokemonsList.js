import { put } from 'redux-saga/effects';
import { setPokemonsList } from '../actions/pokemons';

export default function* getProfilesList() {
  try {
    //
    console.log('dddddddd');
    yield put(setPokemonsList([1,2,3,4]));
  } catch (error) {
    console.log('ERROR', error);
  }
}