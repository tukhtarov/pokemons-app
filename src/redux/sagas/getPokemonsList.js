import axios from 'axios';
import { put, call, all } from 'redux-saga/effects';
import { setPokemonsList } from '../actions/pokemons';

export default function* getProfilesList() {
  try {
    //const res = yield call(fetch, 'https://pokeapi.co/api/v2/pokemon/');
    const res = yield call(axios, {
      method:'get',
      url:'https://pokeapi.co/api/v1/pokemon/?limit=53',
      responseType:'stream'
    });
    console.log(res.data.objects);
    
    const types = yield call(axios, {
      method:'get',
      url:'https://pokeapi.co/api/v2/type',
      responseType:'stream'
    });
    console.log(types.data.results);
    

    // const newArray = yield [1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((item, ind) => call(axios, {
    //   method:'get',
    //   url:`http://pokeapi.salestock.net/api/v2/pokemon/${Number(ind)+1}`,
    //   responseType:'stream'
    // }));

    // console.log(newArray);

    // const res2 = yield all(res.data.results.map((pok, ind) => call(axios, {
    //   method:'get',
    //   url:`http://pokeapi.salestock.net/api/v2/pokemon/${Number(ind)+1}`,
    //   responseType:'stream'
    // })));
    // console.log(res2);
    yield put(setPokemonsList({list: res.data.objects, types: types.data.results}));
  } catch (error) {
    console.log('ERROR', error);
  }
}