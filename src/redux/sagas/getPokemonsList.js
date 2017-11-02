import axios from 'axios';
import { put, call, all } from 'redux-saga/effects';
import { setPokemonsList } from '../actions/pokemons';

export default function* getProfilesList() {
  try {
    const res = yield call(axios, {
      method:'get',
      url:'https://pokeapi.co/api/v1/pokemon/?limit=53',
      responseType:'stream'
    });
    
    const types = yield call(axios, {
      method:'get',
      url:'https://pokeapi.co/api/v2/type',
      responseType:'stream'
    });
    yield put(setPokemonsList({list: res.data.objects, types: types.data.results}));
  } catch (error) {
    console.log('ERROR', error);
  }
}