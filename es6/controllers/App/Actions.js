//This file includes Action definitions for the App controller. 
import { APP_START as START } from '../../constants';
/**
 * Defines action types for the App controller
 */
export const TYPES = {
    INIT: START | 0x00001,
    INFO_ACTION: START | 0x00002,
};
/**
 * Defines actions for the App controller
 */
export const ACTIONS = {
    INIT: {
        type: TYPES.INIT,
        data: {},
    },
    INFO_ACTION: function (e) {
        return {
            type: TYPES.INFO_ACTION,
            data: e,
        };
    }
};
//# sourceMappingURL=Actions.js.map