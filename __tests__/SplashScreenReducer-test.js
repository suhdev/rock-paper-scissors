jest.unmock('../es6/controllers/SplashScreen/Reducer');
jest.unmock('immutable'); 

import {Reducer} from '../es6/controllers/SplashScreen/Reducer';
import {ACTIONS} from '../es6/controllers/SplashScreen/Actions';
import {ACTIONS as GAME_ACTIONS} from '../es6/controllers/GamePlay/Actions'; 
import * as Immutable from 'immutable';  
import {SplashScreenInitialState} from '../es6/controllers/SplashScreen/StateAndProps';  
describe("Testing SplashScreen Reducer",function(){
    let state = Immutable.Map(SplashScreenInitialState); 
    
    
    it("should not modify state on an empty action",function(){
        expect(state).toEqual(Reducer(state,{}));
    });
    
    it("should modify state on an accepted action",function(){
        let newState = Reducer(state,ACTIONS.START(0)); 
        expect(state).not.toEqual(newState); 
    });
    
    it("should modify state on a game play action", function(){
        let newState = Reducer(state,GAME_ACTIONS.MAIN_MENU);
        expect(state).toEqual(newState); 
        expect(newState.get('visible')).toEqual(true);
    });
});