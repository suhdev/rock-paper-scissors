jest.unmock('../es6/controllers/App/Reducer');
jest.unmock('immutable'); 

import {Reducer} from '../es6/controllers/App/Reducer';
import {ACTIONS} from '../es6/controllers/App/Actions';
import * as Immutable from 'immutable';  
import {AppInitialState} from '../es6/controllers/App/StateAndProps';  
describe("Testing App Reducer",function(){
    let state = Immutable.Map(AppInitialState); 
    
    
    it("should not modify state on an empty action",function(){
        expect(state).toEqual(Reducer(state,{}));
    });
    
    it("should modify state on an accepted action",function(){
        expect(state).not.toEqual(Reducer(state,ACTIONS.INFO_ACTION(true)));
    });
    
    it("shouldn't modify state on an accepted action with similar internal value",function(){
        expect(state).toEqual(Reducer(state,ACTIONS.INFO_ACTION(false)));
    });
});