import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as pokemonsActions from '../redux/actions/pokemons';

const stateToProps = store => ({
    pokemonsList: store.pokemons.list,
    types: store.pokemons.types,
});

const actionToProps = dispatch => bindActionCreators({
    ...pokemonsActions,
}, dispatch);

class PokemonsList extends Component {
    
    constructor() {
        super();
        this.state = {
            searchString: '',
            rowsPerPage: 10,
            currentPage: 1,
            normal: true,
            fighting: true,
            flying: true,
            poison: true,
            ground: true,
            rock: true,
            bug: true,
            ghost: true,
            steel: true,
            fire: true,
            water: true,
            grass: true,
            electric: true,
            psychic: true,
            ice: true,
            dragon: true,
            dark: true,
            fairy: true,
            unknown: true,
            shadow: true,
        }
    }

    componentDidMount() {
        this.props.getPokemonsList();
    }

    renderRow = () => {
        const { currentPage, rowsPerPage } = this.state;
        const list = this.getFilteredListByType().slice(currentPage*rowsPerPage-rowsPerPage, currentPage*rowsPerPage);
        console.log(list);
        if (list.length === 0) {
            return;
        }

        return list.map((pok, ind) => {
            const typesStr = pok.types.map(type => type.name).toString(' ,');
            return(
                <tr key={ind}>
                    <td>{currentPage*rowsPerPage-rowsPerPage+ind+1}</td>
                    <td>{pok.name}</td>
                    <td>{typesStr}</td>
                </tr>
            );
        });
    }

    getFilteredPokemonsList = () => {
        const { pokemonsList } = this.props;
        const { searchString } = this.state;
        return pokemonsList.filter((pok) => {
            const re = new RegExp(searchString, 'gi');
            return pok.name.match(re);
        });
    }

    getFilteredListByType = () => {
        return this.getFilteredPokemonsList().filter((pok) => {
            for (let i=0; i<pok.types.length; i++) {
                const type = pok.types[i].name;
                if (this.state[type]) {
                    return true;
                }
            }
            return false;
        });
    }

    renderTypes = () => {
        const { types } = this.props;
        return types.map((t,index) => {
            return (
                <div key={index}>
                    <input
                        type="checkbox"
                        onChange={(e) => {
                            let ob = {};
                            ob[t.name] = !this.state[t.name];
                            this.setState(ob);
                        }}
                        checked={this.state[t.name]}
                    />
                    <span>{t.name}</span>
                </div>
            );
        });
    }

    render() {
        console.log(this.props);
        console.log(this.getFilteredListByType().length);
        const { currentPage, rowsPerPage } = this.state;
        return(
            <div className="App">
                <input
                    placeholder="Search by name"
                    onChange={(e) => this.setState({searchString: e.target.value})}
                />
                <div>
                    {this.renderTypes()}
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>Number</td>
                            <td>Name</td>
                            <td>Type</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRow()}
                    </tbody>
                </table>
                <button
                    onClick={() => this.setState({currentPage: currentPage+1})}
                    disabled={(this.getFilteredListByType().length - (currentPage*rowsPerPage) > 0) ? false : true}
                >
                    Next
                </button>
            </div>
        );
    }
}

export default connect(stateToProps, actionToProps)(PokemonsList)