import axios from 'axios';
import { put, call, all } from 'redux-saga/effects';
import { setPokemonsList } from '../actions/pokemons';

export default function* getProfilesList() {
  try {
    //const res = yield call(fetch, 'https://pokeapi.co/api/v2/pokemon/');
    const res = yield call(axios, {
      method:'get',
      url:'https://pokeapi.co/api/v2/pokemon/?limit=1000',
      responseType:'stream'
    });
    console.log(res.data.results);
    const arr = res.data.results.map((pok, ind) => () => call(axios, {
      method:'get',
      url:`https://pokeapi.co/api/v2/pokemon/${Number(ind)+1}`,
      responseType:'stream'
    }));
    console.log(arr);
    const res2 = yield all(arr);
    // const res2 = yield all([
    //   call(axios, {
    //     method:'get',
    //     url:'https://pokeapi.co/api/v2/pokemon/1',
    //     responseType:'stream'
    //   }),
    //   call(axios, {
    //     method:'get',
    //     url:'https://pokeapi.co/api/v2/pokemon/2',
    //     responseType:'stream'
    //   })
    // ]);
    console.log(res2);
    yield put(setPokemonsList(res.data.results));
  } catch (error) {
    console.log('ERROR', error);
  }
}