import ActionTypes from '../constants';

const initialState = {
  list: [],
  loading: false
};

export default function pokemons(state = initialState, action) {
  let newState;
  switch (action.type) {
    case ActionTypes.GET_POKEMONS_LIST:
      return {...state, loading: true};
    case ActionTypes.SET_POKEMONS_LIST:
      return {...state, list: action.payload, loading: false};
    default:
      return state;
  }
}