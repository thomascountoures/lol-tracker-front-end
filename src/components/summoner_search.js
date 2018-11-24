import React, { Component } from 'react';

class SummonerSearch extends Component {
    constructor(props) {
        super(props);

        // React components that use ES6 classes no longer autobind
        // 'this' to methods that aren't native to React. Need to
        // add these expressions within the constructor.
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    /**
     * Filter out key presses for enter
     * If enter call parent method to update matches state
     * @param {*} event 
     */
    handleKeyPress(event) {
        if(event.key === 'Enter') {
            this.props.handleSearch(event.target.value);
        }
    }

    render () {        
        if(this.props.playerName) {
            return (
                <div>                    
                    <input type="text"
                        className="form-control searchSummoner"
                        placeholder="Search for a summoner..."
                        onKeyPress={this.handleKeyPress} />
                        <header>
                            <h1 className="player-name">{this.props.player}</h1>
                        </header>
                </div>
            );
        } else {
            return (
                <input type="text"
                        className="form-control searchSummoner"
                        placeholder="Search for a summoner..."
                        onKeyPress={this.handleKeyPress} />
            )
        }
            
        
    }

};

export default SummonerSearch;