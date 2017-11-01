import ActionTypes from '../constants';

export function getPokemonsList() {
  return {
    type: ActionTypes.GET_POKEMONS_LIST
  };
}

export function setPokemonsList(payload) {
    return {
      type: ActionTypes.SET_POKEMONS_LIST,
      payload
    };
  }