//StrikeJS is a library that I've built to write ReactJS applications. 
//It is in a way an OO version of Redux, with some nice features including 
//Dependency injection module, service middlewares, and integer based action types. 

import {ControllerViewProps} from 'strikejs'; 
import {Player,ComputerPlayer,UserPlayer} from '../../services/GameModels';
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

/**
 * The GamePlayCtrl props. This helps with static typing in TypeScript. 
 */
export interface GamePlayProps extends ControllerViewProps{
    onOpenInfo:Function;
}

/**
 * The GamePlayCtrl state. This helps with static typing in TypeScript. 
 */
export interface GamePlayState {
    /**
     * Whether the controller component is visible or not. 
     * @type {boolean}
     */
    visible:boolean;
    /**
     * The first player. 
     * @type {Player}
     */
    player1:Player;
    /**
     * The second player.
     * @type {Player}
     */
    player2:Player; 
    /**
     * The current round. 
     * @type {number}
     */
    round:number;
    /**
     * The max rounds of the game. By default set to 3. 
     * @type {number}
     */
    maxRounds:number;
    /**
     * The game winner. This is set by the reducer at the final round of the game. 
     * @type {Player}
     */
    gameWinner:Player;
    /**
     * The current game mode. This can be either {GAME_MODES.PLAYER_VS_COMPUTER} or {GAME_MODES.COMPUTER_VS_COMPUTER}. 
     * @type {string}
     */
    gameMode:string;
    /**
     * The current round's winner, or null if it is a draw. 
     * @type {Player}
     */
    roundWinner:Player;
    /**
     * Whether the round card visible or not
     * @type {boolean}
     */
    roundCardVisible:boolean;
    /**
     * Whether the game finish card is visible or not. 
     * @type {boolean}
     */
    finishCardVisible:boolean;
    /**
     * Whether the game is playing or paused i.e. when the round/finish cards are visible. This is mainly to control 
     * the animation of the computer players to pause/resume the animation timers. 
     * @type {boolean}
     */
    playing:boolean;
}