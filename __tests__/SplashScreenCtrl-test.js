jest.unmock("../es6/controllers/SplashScreen/SplashScreen");
jest.unmock("strikejs");
jest.unmock("../es6/controllers/SplashScreen/Reducer");
jest.unmock("../es6/controllers/SplashScreen/Actions");
jest.unmock("../es6/controllers/SplashScreen/StateAndProps");
jest.unmock("../es6/ui/Dialog");
jest.unmock("../es6/ui/Logo");
jest.unmock("../es6/ui/Button");
jest.unmock("../es6/ui/IconButton");
import {SplashScreenCtrl} from '../es6/controllers/SplashScreen/SplashScreen';
import {SplashScreenInitialState,STATE_KEY} from '../es6/controllers/SplashScreen/StateAndProps';
import {GAME_MODES} from '../es6/constants'; 
import {Store,Combiner} from 'strikejs';
import * as Immutable from 'immutable';  
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe("Testing SplashScreenCtrl component",function(){
    it("Render SplashScreenCtrl",function(){
        let store = Store.create(Immutable.Map({}),Combiner.combine(),[],false,true);
        var obj = {
            onInfoClick:function(){
                
            }
        };
        spyOn(obj,'onInfoClick').and.callThrough(); 
        const ctrl = TestUtils.renderIntoDocument(
            <SplashScreenCtrl store={store} onInfoClick={obj.onInfoClick} />
        );
        
         let ctrlNode = ReactDOM.findDOMNode(ctrl);
         expect(ctrlNode.getAttribute("data-visible")).toEqual("true");
         ctrl.onModeSelected(GAME_MODES.PLAYER_VS_COMPUTER);
         ctrlNode = ReactDOM.findDOMNode(ctrl);
         expect(ctrlNode.getAttribute("data-visible")).toEqual("false");
         
        
        
    });
}); 