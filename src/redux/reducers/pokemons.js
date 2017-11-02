import ActionTypes from '../constants';

const initialState = {
  list: [],
  loading: false,
  types: [],
};

export default function pokemons(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_POKEMONS_LIST:
      return {...state, loading: true};
    case ActionTypes.SET_POKEMONS_LIST:
      return {...state, list: action.payload.list, loading: false, types: action.payload.types};
    default:
      return state;
  }
}