import { APP_START, START_MASK } from '../../constants';
import { TYPES } from './Actions';
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