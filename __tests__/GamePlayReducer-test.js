jest.unmock('../es6/controllers/GamePlay/Reducer');
// jest.unmock('../es6/controllers/GamePlay/Actions');
// jest.unmock('../es6/controllers/SplashScreen/Actions');
// jest.unmock('../es6/controllers/GamePlay/StateAndProps');
jest.unmock('immutable'); 

import {Reducer} from '../es6/controllers/GamePlay/Reducer';
import {ACTIONS} from '../es6/controllers/GamePlay/Actions';
import {GAME_MODES,PLAY_STATES} from '../es6/constants'; 
import {ACTIONS as SPLASH_ACTIONS} from '../es6/controllers/SplashScreen/Actions';
import * as Immutable from 'immutable';  
import {GamePlayInitialState} from '../es6/controllers/GamePlay/StateAndProps';  
describe("Testing GamePlay Reducer",function(){
    let state = Immutable.Map(GamePlayInitialState); 
    
    it("should not modify state on an empty action",function(){
        expect(state).toEqual(Reducer(state,{}));
    });
    
    it("should modify state on SPLASH_ACTIONS an accepted action",function(){
        let newState = Reducer(state,SPLASH_ACTIONS.START(GAME_MODES.PLAYER_VS_COMPUTER)); 
        expect(state).not.toEqual(newState);
        expect(newState.get('visible')).toEqual(true); 
    });
    
    it("should modify state on CHOICE",function(){
        let newState = Reducer(state,ACTIONS.CHOICE(PLAY_STATES[0]));
        expect(newState.get('player2').state).toEqual(PLAY_STATES[0]);
    });
    
    it("should modify state on MAIN_MENU", function(){
        let newState = Reducer(state,SPLASH_ACTIONS.START(GAME_MODES.PLAYER_VS_COMPUTER));
        expect(newState.get('visible')).toEqual(true);
        newState = Reducer(newState,ACTIONS.CHOICE(PLAY_STATES[0]));
        expect(newState.get('roundCardVisible')).toEqual(true);
        newState = Reducer(newState,ACTIONS.MAIN_MENU);
        expect(newState.get('visible')).toEqual(false);
    });
    
    it("should modify state on full game", function(){
        let newState = Reducer(state,SPLASH_ACTIONS.START(GAME_MODES.PLAYER_VS_COMPUTER));
        expect(newState.get('roundCardVisible')).toEqual(false);
        newState = Reducer(newState,ACTIONS.CHOICE(PLAY_STATES[0]));
        expect(newState.get('roundCardVisible')).toEqual(true);
        newState = Reducer(newState,ACTIONS.NEXT_ROUND);
        expect(newState.get('roundCardVisible')).toEqual(false);
        expect(newState.get('round')).toEqual(2);
        newState = Reducer(newState,ACTIONS.CHOICE(PLAY_STATES[1]));
        expect(newState.get('roundCardVisible')).toEqual(true);
        newState = Reducer(newState,ACTIONS.NEXT_ROUND);
        expect(newState.get('roundCardVisible')).toEqual(false);
        expect(newState.get('round')).toEqual(3);
        newState = Reducer(newState,ACTIONS.CHOICE(PLAY_STATES[1]));
        expect(newState.get('roundCardVisible')).toEqual(false);
        expect(newState.get('finishCardVisible')).toEqual(true);
    });
    
    it("should modify state on full game", function(){
        let newState = Reducer(state,SPLASH_ACTIONS.START(GAME_MODES.PLAYER_VS_COMPUTER));
        expect(newState.get('roundCardVisible')).toEqual(false);
        newState = Reducer(newState,ACTIONS.CHOICE(PLAY_STATES[0]));
        expect(newState.get('roundCardVisible')).toEqual(true);
        newState = Reducer(newState,ACTIONS.NEXT_ROUND);
        expect(newState.get('roundCardVisible')).toEqual(false);
        expect(newState.get('round')).toEqual(2);
        newState = Reducer(newState,ACTIONS.CHOICE(PLAY_STATES[1]));
        expect(newState.get('roundCardVisible')).toEqual(true);
        newState = Reducer(newState,ACTIONS.NEXT_ROUND);
        expect(newState.get('roundCardVisible')).toEqual(false);
        expect(newState.get('round')).toEqual(3);
        newState = Reducer(newState,ACTIONS.CHOICE(PLAY_STATES[1]));
        expect(newState.get('roundCardVisible')).toEqual(false);
        expect(newState.get('finishCardVisible')).toEqual(true);
        newState = Reducer(newState,ACTIONS.RESTART);
        expect(newState.get("finishCardVisible")).toEqual(false);
        expect(newState.get('round')).toEqual(1); 
        expect(newState.get('maxRounds')).toEqual(3);
    });
});