//This file includes any cross-controller constants. 
import {PlayState} from './services/GameModels'; 

/**
 * Used to mask action's type field to get the start bits only. 
 */
export const START_MASK         = 0xF00000; 

/**
 * App controller action space 
 */
export const APP_START          = 0x100000;
/**
 * Splash Screen controller action space 
 */ 
export const SPLASH_START       = 0x200000;
/**
 * Game controller action space
 */ 
export const GAME_START         = 0x400000; 
/**
 * Time to wait for simulated choice to happen (in ms). 
 */
export const SIMULATION_TIMEOUT = 3000; 
/**
 * Time interval for computer state change (in ms).  
 */
export const COMPUTER_HAND_CHANGE_INTERVAL = 100; 

/**
 * The available game modes. Makes it easier to work with around the application. 
 */
export const GAME_MODES = {
    PLAYER_VS_COMPUTER:"player",
    COMPUTER_VS_COMPUTER:"computer"
};

/**
 * Player types, a player can be either a computer in whose states are generated randomly, 
 * or a user player whose states are generated based on user interactions.  
 */
export const PLAYER_TYPE = {
    COMPUTER    :0x0001,
    USER        :0x0002
}

/**
 * The available game states. To extend the game add the new states to the array below. 
 * Note that the value field must be a multiple of 2. Using bit-wise operations we can
 * extend the game to have one state beating multiple states rather than one state.  
 */
export const PLAY_STATES:PlayState[] = [
    {
        label:'Rock',
        value:0x00001,
        beats:0x00002, 
        icon:'fa fa-fw fa-hand-rock-o'
    },
    {
        label:'Scissors',
        value:0x00002,
        beats:0x00004,
        icon:'fa fa-fw fa-hand-scissors-o'
    },
    {
        label:'Paper',
        value:0x00004,
        beats:0x00001,
        icon:'fa fa-fw fa-hand-paper-o'    
    }
];