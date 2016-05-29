import { START_MASK, GAME_START, SPLASH_START } from '../../constants';
import { TYPES as GAME_TYPES } from '../GamePlay/Actions';
import { TYPES } from './Actions';
export function Reducer(state, action) {
    let newState = state;
    let v = action.type & START_MASK;
    if (v === SPLASH_START ||
        v === GAME_START) {
        switch (action.type) {
            case TYPES.START:
                newState = newState.set('visible', false);
                break;
            case GAME_TYPES.MAIN_MENU:
                newState = newState.set('visible', true);
                break;
        }
    }
    return newState;
}
//# sourceMappingURL=Reducer.js.map