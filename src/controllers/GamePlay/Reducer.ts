import {Action} from 'strikejs'; 
import {START_MASK,SPLASH_START,GAME_START,GAME_MODES} from '../../constants';
import {TYPES as SPLASH_TYPES} from '../SplashScreen/Actions'; 
import {ComputerPlayer,UserPlayer,Player} from '../../services/GameModels';
import {TYPES} from './Actions';
/**
 * GamePlayCtrl reducer function. Reducer functions receive the current state of their controllers and the currently dispatched action,
 * and they return the new state of their controllers. 
 * 
 * @param {Immutable.Map<string,any>} state the current state of {GamePlayCtrl} 
 * @param {Action} action the currently dispatched action. 
 */
export function Reducer(state:Immutable.Map<string,any>,action:Action):Immutable.Map<string,any>{
    //create a reference to the current state. 
    let newState = state;
    //mask the action space bits such that we can perform a quick check to see if we need to  
    //handle this action or not. This technique is mainly used for performance reasons and can be skipped on smaller applications. 
    let v = action.type & START_MASK; 
    if (v === SPLASH_START ||
        v === GAME_START){
        switch(action.type){
            case TYPES.RESTART:
            newState = newState.withMutations((m)=>{
                let player1:Player = m.get('player1'),
                    player2:Player = m.get('player2'); 
                player1.setScore(0);
                player2.setScore(0); 
                player1.state = null;
                player2.state = null; 
                m.set('playing',true)
                    .set('round',1)
                    .set('finishCardVisible',false)
                    .set('roundCardVisible',false); 
            });
            break;
            case SPLASH_TYPES.START:
            newState = newState.withMutations((m)=>{
                let isSimulated = action.data === GAME_MODES.COMPUTER_VS_COMPUTER,
                    player1:Player = new ComputerPlayer(isSimulated?"Computer 1":"Computer"),
                    player2:Player = isSimulated?new ComputerPlayer("Computer 2"):new UserPlayer("You");    
                m.set('visible',true)
                    .set('round',1)
                    .set('gameMode',action.data)
                    .set('playing',true)
                    .set('player1',player1)
                    .set('player2',player2);
            });
            break;
            case TYPES.CHOICE:
            newState = newState.withMutations((m)=>{
                let player1:Player = m.get('player1'),
                    player2:Player = m.get('player2'),
                    round = m.get('round'),
                    maxRounds = m.get('maxRounds'),
                    gameWinner:Player = null,
                    winner:Player,
                    play = player1.play(); 
                player2.state = action.data;
                if ((action.data.beats & play.value) > 0){
                    winner = player2;
                    player2.addPoints(1); 
                }else if ((play.beats & action.data.value) > 0){
                    winner = player1;
                    player1.addPoints(1); 
                }
                if (player1._score > player2._score){
                    gameWinner = player1; 
                }else if (player1._score < player2._score){
                    gameWinner = player2; 
                }
                if (round === maxRounds){
                    m.set('finishCardVisible',true);
                }else {
                    m.set('roundCardVisible',true);
                }
                m.set('roundWinner',winner)
                    .set('playing',false)
                    .set('gameWinner',gameWinner);
            });
            break;
            case TYPES.NEXT_ROUND:
            newState = newState.withMutations((m)=>{
                let round = m.get('round'),
                    maxRounds = m.get('maxRounds'); 
                m.set('roundCardVisible',false)
                    .set('round',++round)
                    .set('playing',true);
            });
            break;
            case TYPES.MAIN_MENU:
            newState = newState.withMutations((m)=>{
                m.set('playing',false)
                    .set('visible',false)
                    .set('roundCardVisible',false)
                    .set('finishCardVisible',false); 
            });
            break;
        }        
    }
    return newState;
}