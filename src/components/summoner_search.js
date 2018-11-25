import React, { Component } from 'react';
import '../summoner_search.css';

class SummonerSearch extends Component {
    constructor(props) {
        super(props);

        // React components that use ES6 classes no longer autobind
        // 'this' to methods that aren't native to React. Need to
        // add these expressions within the constructor.
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleUpdateDesiredResults = this.handleUpdateDesiredResults.bind(this);

        this.selectRef = React.createRef();

        this.state = {
            resultsDesired: "5"
        }
    }

    /**
     * Filter out key presses for enter
     * If enter call parent method to update matches state
     * @param {*} event 
     */
    handleKeyPress(event) {
        if(event.key === 'Enter') {            
            this.props.handleSearch(event.target.value, this.state.resultsDesired); 
        }
    }

    handleUpdateDesiredResults(event) {        
        this.setState({ resultsDesired: event.target.value });
    }

    render () {              
            return (
                <div>                    
                    <input type="text"
                        className="form-control searchSummoner"
                        placeholder="Search for a summoner..."
                        onKeyPress={this.handleKeyPress} />

                    <label className="results-desired-label" for="results-desired">Desired results</label>
                    <select name="results-desired" className="custom-select custom-select-lg mt-10" onChange={this.handleUpdateDesiredResults}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>                        
                    </select>

                    <header>
                        <h1 className="player-name">{this.props.player}</h1>
                    </header>
                </div>
            );
        
    }

};

export default SummonerSearch;