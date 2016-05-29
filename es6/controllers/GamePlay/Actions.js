import { GAME_START as START } from '../../constants';
/**
 * The supported action types.
 */
export const TYPES = {
    RESTART: START | 0x0001,
    CHOICE: START | 0x0002,
    NEXT_ROUND: START | 0x0003,
    MAIN_MENU: START | 0x0004,
};
/**
 * The supported action definitons.
 */
export const ACTIONS = {
    RESTART: {
        type: TYPES.RESTART,
        data: 1
    },
    CHOICE: function (e) {
        return {
            type: TYPES.CHOICE,
            data: e
        };
    },
    NEXT_ROUND: {
        type: TYPES.NEXT_ROUND,
        data: {}
    },
    MAIN_MENU: {
        type: TYPES.MAIN_MENU,
        data: {}
    },
};
//# sourceMappingURL=Actions.js.map