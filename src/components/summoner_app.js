import React, { Component } from 'react';
import SummonerSearch from './summoner_search';
import SummonerMatches from './summoner_matches';

// css, loader
import '../summoner_app.css';
import loader from '../img/loader.gif';

class SummonerApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            player: "",
            matches: [],
            championJSON: {},
            errorMessage: "",
            loading: false
        };

        // React components that use ES6 classes no longer autobind
        // 'this' to methods that aren't native to React. Need to
        // add these expressions within the constructor.
        this.handleSearch = this.handleSearch.bind(this);
        this.handleThrowError = this.handleThrowError.bind(this);
    }

    async componentDidMount() {
        // fetch champion data on page load to cache in state
        const response = await fetch("http://localhost:1337/data/champion.json");
        const championJSON = await response.json();
        this.setState({ championJSON });           
    }

    async handleSearch(summonerName, resultsDesired) {

        this.setState({ matches: [], errorMessage: "" });
        
        this.setState({ loading: true }); 
        
        const response = await fetch(`http://localhost:1337/summoner/${encodeURIComponent(summonerName)}?resultsDesired=${encodeURIComponent(resultsDesired)}`);

        // set it to 200 on the backend in this case
        if(response.status === 200 || response.status === 304) {
            const matches = await response.json();
            if(matches.length > 0) {
                // update matches state
                this.setState({ matches, player: summonerName, loading: false });
            } else {
                this.setState({ errorMessage: "No matches found for this player", loading: false });
                return;
            }
        } else if(response.status === 429) {
            this.setState({ errorMessage: "Server error. Some JSON wasn't returned properly. Please try again." });
        } else {
            this.setState({ errorMessage: "Server error. Player not found. Please try again and search for a new player." });
            return;
        }

    }

    handleThrowError(errorMessage) {
        this.setState({ errorMessage });
    }

    render() {
        if(this.state.player) {
            return (
                <div className="summoner-app">
                    
                    <SummonerSearch 
                        handleSearch={this.handleSearch}
                        playerName={this.state.player} />
                    
                    <header>
                        <h1 className="player-name">{this.state.player}</h1>
                    </header>
                    
                    {this.state.loading && <img src={loader} alt="Loader" />}

                    <SummonerMatches
                        player={this.state.player}
                        matches={this.state.matches}
                        championJSON={this.state.championJSON}
                        loading={this.state.loading}
                        handleThrowError={this.handleThrowError} />

                    <div class="text-danger">{this.state.errorMessage}</div>
    
                </div>
            );
        } else {
            return (
                <div>                    
                    <SummonerSearch 
                        handleSearch={this.handleSearch}
                        playerName={this.state.player} />

                        {this.state.loading && <img src={loader} alt="Loader" />}
                        <div className="text-danger">{this.state.errorMessage}</div>
                </div>
            );
        }
        
    }



};

export default SummonerApp;