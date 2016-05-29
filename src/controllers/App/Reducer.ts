import {Action} from 'strikejs'; 
import {APP_START,START_MASK} from '../../constants'; 
import {TYPES} from './Actions'; 
export function Reducer(state:Immutable.Map<string,any>,action:Action):Immutable.Map<string,any>{
    let newState = state;
    let v= action.type & START_MASK;
    if (v === APP_START){
        switch(action.type){
            case TYPES.INFO_ACTION:
            newState = newState.set('infoDialogVisible',action.data); 
            break;
        }
    }
    return newState;
}