import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Table, FormControl, Checkbox} from 'react-bootstrap';

import * as pokemonsActions from '../redux/actions/pokemons';

const stateToProps = store => ({
    pokemonsList: store.pokemons.list,
    types: store.pokemons.types,
    loading: store.pokemons.loading,
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
            all: true,
        }
    }

    componentDidMount() {
        this.props.getPokemonsList();
    }

    renderRow = () => {
        const { currentPage, rowsPerPage } = this.state;
        const list = this.getFilteredListByType().slice(currentPage*rowsPerPage-rowsPerPage, currentPage*rowsPerPage);
        
        if (list.length === 0) {
            return;
        }

        return list.map((pok, ind) => {
            const typesStr = pok.types.map(type => type.name).toString(', ');
            return(
                <tr key={ind}>
                    <td>{currentPage*rowsPerPage-rowsPerPage+ind+1}</td>
                    <td>{pok.name}</td>
                    <td>{typesStr}</td>
                </tr>
            );
        });
    }

    getFilteredListByName = () => {
        const { pokemonsList } = this.props;
        const { searchString } = this.state;
        return pokemonsList.filter((pok) => {
            const re = new RegExp(searchString, 'gi');
            return pok.name.match(re);
        });
    }

    getFilteredListByType = () => {
        return this.getFilteredListByName().filter((pok) => {
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
                <Checkbox
                    key={index}
                    style={{margin: '5px'}}
                    onChange={(e) => {
                        let ob = { currentPage: 1 };
                        ob[t.name] = !this.state[t.name];
                        this.setState(ob);
                    }}
                    checked={this.state[t.name]} 
                >
                    {t.name}
                </Checkbox>
            );
        });
    }

    render() {
        const { currentPage, rowsPerPage } = this.state;
        const { loading } = this.props;
        if (loading) {
            return (
                <div className="loading-container">
                    <h2>Loading data</h2>
                    <img alt="App-logo" className="App-logo" src={require('../logo.svg')}/>
                </div>
            );
        }
        return(
            <div className="App">
                <h1>Find Your Pokemon!</h1>
                <FormControl
                    placeholder="Search by name"
                    onChange={(e) => this.setState({searchString: e.target.value, currentPage: 1})}
                />
                <h5>Filter by type:</h5>
                <div className="checkbox-container">
                    {this.renderTypes()}
                </div>
                <Table striped>
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
                </Table>
                <Button
                    onClick={() => this.setState({currentPage: currentPage-1})}
                    disabled={currentPage === 1 ? true : false}
                >
                    Previous
                </Button>
                <Button
                    onClick={() => this.setState({currentPage: currentPage+1})}
                    disabled={(this.getFilteredListByType().length - (currentPage*rowsPerPage) > 0) ? false : true}
                >
                    Next
                </Button>
            </div>
        );
    }
}

export default connect(stateToProps, actionToProps)(PokemonsList)