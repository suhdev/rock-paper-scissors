import { APP_START, START_MASK } from '../../constants';
import { TYPES } from './Actions';
/**
 * AppCtrl reducer function. Reducer functions receive the current state of their controllers and the currently dispatched action,
 * and they return the new state of their controllers.
 *
 * @param {Immutable.Map<string,any>} state the current state of {AppCtrl}
 * @param {Action} action the currently dispatched action.
 */
export function Reducer(state, action) {
    let newState = state;
    let v = action.type & START_MASK;
    if (v === APP_START) {
        switch (action.type) {
            case TYPES.INFO_ACTION:
                newState = newState.set('infoDialogVisible', action.data);
                break;
        }
    }
    return newState;
}
//# sourceMappingURL=Reducer.js.map