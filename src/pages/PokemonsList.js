import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as pokemonsActions from '../redux/actions/pokemons';

const stateToProps = store => ({
    pokemonsList: store.pokemons.list,
});

const actionToProps = dispatch => bindActionCreators({
    ...pokemonsActions,
}, dispatch);

class PokemonsList extends Component {
    componentDidMount() {
        this.props.getPokemonsList();
    }
    render() {
        console.log(this.props);
        return(
            <div className="App">This is an app</div>
        );
    }
}

export default connect(stateToProps, actionToProps)(PokemonsList)