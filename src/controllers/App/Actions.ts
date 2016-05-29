//This file includes Action definitions for the App controller. 

import {APP_START as START} from '../../constants';
/**
 * Defines action types for the App controller
 */ 
export const TYPES = {
    /**
     * Fired upon application initialization
     */
    INIT            :START | 0x00001, 
    /**
     * Fired when either the info button is clicked or the close button of on the info dialog is clicked. 
     */
    INFO_ACTION     :START | 0x00002, 
};

/**
 * Defines actions for the App controller 
 */
export const ACTIONS = {
    INIT:{
        type:TYPES.INIT,
        data:{},
    },
    /**
     * Fired when either the info button is clicked or the close button of on the info dialog is clicked.
     * 
     * @param {boolean} e true or false depending on whether to show or hide the info dialog. 
     */
    INFO_ACTION:function(e:boolean){
        return {
            type:TYPES.INFO_ACTION,
            data:e,
        };
    }
};