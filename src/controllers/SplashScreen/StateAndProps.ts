//StrikeJS is a library that I've built to write ReactJS applications. 
//It is in a way an OO version of Redux, with some nice features including 
//Dependency injection module, service middlewares, and integer based action types. 

import {ControllerViewProps} from 'strikejs'; 

export const STATE_KEY = 'splashScreen'; 

export const SplashScreenInitialState:SplashScreenState = {
    visible:true,
}

export interface SplashScreenProps extends ControllerViewProps{
    onOpenInfo:Function;
}

/**
 * SplashScreenCtrl state 
 * @export
 * @interface SplashScreenState
 */
export interface SplashScreenState {
    /**
     * Whether the screen is visible or not. 
     * @type {boolean}
     */
    visible:boolean;
}