import React, { Component } from 'react';
import '../summoner_match_item.css';

class SummonerMatchItem extends Component {

    constructor(props) {
        super(props);         
        
        // React components that use ES6 classes no longer autobind
        // 'this' to methods that aren't native to React. Need to
        // add these expressions within the constructor.
        // here, some are not using 'this' but it's better to bind them in case anyway
        this.checkDefeatOrVictory = this.checkDefeatOrVictory.bind(this);
        this.getItemsBought = this.getItemsBought.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.getChampionIcon = this.getChampionIcon.bind(this);
        this.getCreepScorePerMinute = this.getCreepScorePerMinute.bind(this); 
        this.calculateTimeDifference = this.calculateTimeDifference.bind(this); 

    }

    /**
     * Displays "Victory" or "Defeat" depending on data
     */
    checkDefeatOrVictory() {
        return (this.props.playerMatchDetails.stats.win) ? <span className="text-success"><i className="fas fa-trophy"></i> Victory</span> : <span className="text-danger">DEFEAT</span>;
    }    

    /**
     * Calculate time difference for letting user known
     * the time elapsed between now and when the match was played
     */
    calculateTimeDifference() {                
        const date = new Date();
        const current = Math.round(date.getTime() / 1000);
        const { gameCreation } = this.props;
        const millisecondsPerMinute = 60 * 1000,
              millisecondsPerHour = millisecondsPerMinute * 60,
              millisecondsPerDay = millisecondsPerHour * 24,
              millisecondsPerMonth = millisecondsPerDay * 30;
    
        const elapsed = current - (gameCreation / 1000);
    
        if (elapsed < millisecondsPerMinute) {
            return Math.round(elapsed/1000) + ' seconds ago';   
        }
    
        else if (elapsed < millisecondsPerHour) {
            return Math.round(elapsed / millisecondsPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < millisecondsPerDay) {
            return Math.round(elapsed / millisecondsPerHour) + ' hours ago';   
        }
    
        else if (elapsed < millisecondsPerMonth) {
            return Math.round(elapsed / millisecondsPerDay) + ' days ago';   
        }
            
    }

    /**
     * Get the icon for the match champion
     */
    getChampionIcon() {
        let { championObject: { name } } = this.props;
        
        // some of these heroes have special characters in their names.
        // like uh, they sound like protoss names (Rek'Sai)
        // we need to remove the special characters so they load the proper images.
        // the images don't have special characters. 
        name = name.replace(/[^A-Z0-9]/ig, "");
        
        return (
            <img src={`http://localhost:1337/img/champion/${name}.png`} />
        );
    }

    /**
     * Calculate creep score per minute
     * @param {Number} totalMinionsKilled 
     * @param {Number} gameDuration 
     */
    getCreepScorePerMinute(totalMinionsKilled, gameDuration) {
        return Math.abs(totalMinionsKilled / gameDuration).toFixed(2);
    }
    
    /**
     * Get items bought
     */
    getItemsBought() {
        const { playerMatchDetails: { stats } = {} } = this.props;
        const hash = {};
        for(var key in stats) {
            if(stats.hasOwnProperty(key)) {
                if(key.indexOf("item") > -1 && !(key in hash)) {
                    if(stats[key] !== 0) {
                        hash[key] = stats[key];                    
                    } 
                } 
            }
        }
        return this.renderItems(hash);
    }

    /**
     * Calculate K/D ratio
     * Do simple math lol
     */
    getKDRatio() {
        return Math.abs(this.props.playerMatchDetails.stats.kills / this.props.playerMatchDetails.stats.deaths).toFixed(2);
    }  

    render() {
        return (
            <section className={"match-item " + this.props.className}>
                <div className="main-player-info">
                    <div className="top-info">
                        <header>                            
                            <div className="champion-icon">{this.getChampionIcon()}</div>
                            <span className="hero-name">{this.props.championObject.name}</span>
                        </header>
                    </div>
                    <div className="game-info">
                        <span>{this.calculateTimeDifference()}</span>
                        <span><i className="fas fa-clock"></i> {Math.floor(this.props.gameDuration / 60)} mins</span>
                        <span>{this.props.gameType}</span> 
                        <span>{this.checkDefeatOrVictory()}</span>
                    </div>                    
                    
                    <div className="champion-info">                        
                        <span>Level: {this.props.playerMatchDetails.stats.champLevel}</span>
                        <span>Total Minions Killed: {this.props.playerMatchDetails.stats.totalMinionsKilled}</span>
                        <span>Creep Score Per Minute: {this.getCreepScorePerMinute(this.props.playerMatchDetails.stats.totalMinionsKilled, this.props.gameDuration)}</span>
                        <span>{this.getItemsBought("item")}</span>
                    </div>                                      

                    <div className="kda">
                        <span className="numbers"><i className="fas fa-bullseye"></i> {this.props.playerMatchDetails.stats.kills} | <i className="far fa-sad-tear"></i> <span className="text-danger d">{this.props.playerMatchDetails.stats.deaths}</span> | <i className="fas fa-hands-helping"></i>{this.props.playerMatchDetails.stats.assists}</span>
                        <span className="kda-ratio text-info">{this.getKDRatio()} KDA</span>
                    </div>

                </div>
                <div className="clearfix"></div>
            </section>
        );
    }

    /**
     * Render items bought to the page
     * @param {obj} hash 
     */
    renderItems(hash) {
        return Object.keys(hash).map((key, index) => {
            return (<img 
                    src={`http://localhost:1337/img/item/${hash[key]}.png`} 
                    key={index} />
                );
        });
    }



};

export default SummonerMatchItem;