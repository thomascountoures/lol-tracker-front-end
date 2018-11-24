import React, { Component } from 'react';
import SummonerMatchItem from './summoner_match_item';

class SummonerMatches extends Component {

    constructor(props) {
        super(props);

        // React components that use ES6 classes no longer autobind
        // 'this' to methods that aren't native to React. Need to
        // add these expressions within the constructor.
        this.getChampionObj = this.getChampionObj.bind(this); 

        this.state = {
            errorMessage: ""
        }
    }

    /**
     * Gets the champion object for the current player
     * @param {*} playerMatchDetails 
     */
    getChampionObj(playerMatchDetails) {
        try {
            const championId = String(playerMatchDetails.championId);
            const championsObjects = this.props.championJSON.data;
                    
            // grab correct champion object by converting object of objects
            // into array of objects, and locating the correct champion by
            // its key (id).
            const arrayOfObjects = Object.keys(championsObjects).map(key => {
                return championsObjects[key];
            });
            const targetChampion = Object.keys(championsObjects).map(key => {
                                        return championsObjects[key];
                                    })
                                    .find((obj) => {
                                        return obj.key === championId;                                        
                                    });  

            return targetChampion;
        } catch(e) {
            console.error(e.message);
        }
        
    }

    render() {
        try {
            // there was no previous errors. we don't want to re-render and call setState again.            
                let items = this.props.matches.map((match, index) => {
                    
                // filter out correct player information from group of players
                // pass them as props to individual match item
                const playerIdentity = match.playerIdentities.find((playerObj) => {
                    return playerObj.player.summonerName.toLowerCase() === this.props.player.toLowerCase();
                });

                if(playerIdentity) {
                    const playerMatchDetails = match.playerMatchDetails.find((playerObj) => {
                        return playerObj.participantId === playerIdentity.participantId;
                    });
    
                    const targetChampion = this.getChampionObj(playerMatchDetails);
                    
                    return (             
                        <div>
                            <SummonerMatchItem
                                key={index}
                                className={ (playerMatchDetails.stats.win) ? "victory" : "defeat" }                    
                                playerIdentity={playerIdentity}
                                playerMatchDetails={playerMatchDetails} 
                                championObject={targetChampion}
                                gameDuration={match.gameDuration}
                                gameCreation={match.gameCreation}
                                gameType={match.gameType} />
                        </div>                
                    );
                } else {
                    return (
                        <div className="text-danger">Unable to load this match. Please try again.</div>
                    );
                    //this.setState({ errorMessage: "An error occurred. Please try again." });
                }
                
                
            });
            
            return (                
                <div className="matches">
                    {items}
                </div>
            );                       
        } catch(e) {            
            console.error(e.message);
        }
            

    }

};

export default SummonerMatches;