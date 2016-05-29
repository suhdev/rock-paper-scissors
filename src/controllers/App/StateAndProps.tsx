//StrikeJS is a library that I've built to write ReactJS applications. 
//It is in a way an OO version of Redux, with some nice features including 
//Dependency injection module, service middlewares, and integer based action types. 

import {ControllerViewProps,Injector} from 'strikejs'; 

export const STATE_KEY = 'app'; 

export const AppInitialState:AppState = {
    infoDialogVisible:false, 
}

export interface AppProps extends ControllerViewProps{
    
}

/**
 * AppCtrl state
 * 
 * @export
 * @interface AppState
 */
export interface AppState {
    /**
     * Whether the info dialog is visible or not
     * @type {boolean}
     */
    infoDialogVisible:boolean;
}