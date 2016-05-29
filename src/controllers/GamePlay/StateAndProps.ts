//StrikeJS is a library that I've built to write ReactJS applications. 
//It is in a way an OO version of Redux, with some nice features including 
//Dependency injection module, service middlewares, and integer based action types. 

import {ControllerViewProps} from 'strikejs'; 
import {Player,ComputerPlayer,UserPlayer} from '../../services/GameController';
import {GAME_MODES} from '../../constants';  

export const STATE_KEY = 'game'; 

export const GamePlayInitialState:GamePlayState = {
    visible:false,
    player1:new ComputerPlayer("Computer"),
    player2:new UserPlayer("You"),
    gameWinner:null,
    roundWinner:null,
    maxRounds:3,
    round:0,
    roundCardVisible:false,
    finishCardVisible:false,
    gameMode:GAME_MODES.PLAYER_VS_COMPUTER,
    playing:false,
}

export interface GamePlayProps extends ControllerViewProps{
    onOpenInfo:Function;
}

export interface GamePlayState {
    visible:boolean;
    player1:Player;
    player2:UserPlayer; 
    round:number;
    maxRounds:number;
    gameWinner:Player;
    gameMode:string;
    roundWinner:Player;
    roundCardVisible:boolean;
    finishCardVisible:boolean;
    playing:boolean;    
}