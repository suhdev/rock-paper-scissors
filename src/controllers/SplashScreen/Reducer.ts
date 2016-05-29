import {Action} from 'strikejs'; 
import {START_MASK,GAME_START,SPLASH_START} from '../../constants'; 
import {TYPES as GAME_TYPES} from '../GamePlay/Actions';  
import {TYPES} from './Actions'; 
/**
 * SplashScreenCtrl reducer function. Reducer functions receive the current state of their controllers and the currently dispatched action,
 * and they return the new state of their controllers. 
 * 
 * @param {Immutable.Map<string,any>} state the current state of {SplashScreenCtrl} 
 * @param {Action} action the currently dispatched action. 
 */
export function Reducer(state:Immutable.Map<string,any>,action:Action):Immutable.Map<string,any>{
    let newState = state;
    let v = action.type & START_MASK; 
    if (v === SPLASH_START ||
        v === GAME_START){
        switch(action.type){
            case TYPES.START:
            newState = newState.set('visible',false); 
            break;
            case GAME_TYPES.MAIN_MENU:
            newState = newState.set('visible',true);
            break;
        }
    }
    return newState;
}