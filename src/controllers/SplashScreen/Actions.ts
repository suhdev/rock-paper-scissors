//This file includes Action definitions for the App controller. 

import {SPLASH_START as START} from '../../constants';
/**
 * Defines action types for the App controller
 */ 
export const TYPES = {
    START:START | 0x00001, 
};

/**
 * Defines actions for the App controller 
 */
export const ACTIONS = {
    START:function(type:string){
        return {
            type:TYPES.START,
            data:type,
        };
    }
};