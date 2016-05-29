jest.unmock("../es6/controllers/GamePlay/GamePlay");
jest.unmock("../es6/controllers/GamePlay/GameResults");
jest.unmock("strikejs");
jest.unmock("../es6/controllers/GamePlay/Reducer");
jest.unmock("../es6/controllers/GamePlay/Actions");
jest.unmock("../es6/controllers/GamePlay/StateAndProps");
jest.unmock("../es6/ui/Dialog");
jest.unmock("../es6/ui/Logo");
jest.unmock("../es6/ui/Button");
jest.unmock("../es6/ui/IconButton");
import {GamePlayCtrl} from '../es6/controllers/GamePlay/GamePlay';
import {GamePlayInitialState,STATE_KEY} from '../es6/controllers/GamePlay/StateAndProps';
import {GAME_MODES} from '../es6/constants'; 
import {ACTIONS} from '../es6/controllers/GamePlay/Actions'; 
import {ACTIONS as SPLASH_ACTIONS} from '../es6/controllers/SplashScreen/Actions'; 
import {Store,Combiner} from 'strikejs';
import * as Immutable from 'immutable';  
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe("Testing GamePlayCtrl component",function(){
    it("should render GamePlayCtrl",function(){
        let store = Store.create(Immutable.Map({}),Combiner.combine(),[],false,true);
        var obj = {
            onInfoClick:function(){
                
            }
        };
        spyOn(obj,'onInfoClick').and.callThrough(); 
        const ctrl = TestUtils.renderIntoDocument(
            <GamePlayCtrl store={store} onInfoClick={obj.onInfoClick} />
        );
        
         let ctrlNode = ReactDOM.findDOMNode(ctrl);
         expect(ctrlNode.getAttribute("data-visible")).toEqual("false");
         store.dispatch(SPLASH_ACTIONS.START(GAME_MODES.PLAYER_VS_COMPUTER));
         ctrlNode = ReactDOM.findDOMNode(ctrl);
         expect(ctrlNode.getAttribute("data-visible")).toEqual("true");
         let v = TestUtils.findRenderedDOMComponentWithClass(ctrl,"btn-item-0");
         TestUtils.Simulate.click(v,{}); 
         expect(ctrl.state.roundCardVisible).toEqual(true);
         v = TestUtils.findRenderedDOMComponentWithClass(ctrl,"next-round-btn");
         TestUtils.Simulate.click(v,{}); 
         expect(ctrl.state.roundCardVisible).toEqual(false); 
         expect(ctrl.state.round).toEqual(2);
         ctrl.onMainMenu(); 
         expect(ctrl.state.visible).toEqual(false);
         ctrl.onRestart(); 
         expect(ctrl.state.visible).toEqual(false);
    });
    
    it("should render GamePlayCtrl computer vs computer",function(){
        let store = Store.create(Immutable.Map({}),Combiner.combine(),[],false,true);
        var obj = {
            onInfoClick:function(){
                
            }
        };
        spyOn(obj,'onInfoClick').and.callThrough(); 
        const ctrl = TestUtils.renderIntoDocument(
            <GamePlayCtrl store={store} onInfoClick={obj.onInfoClick} />
        );
        
         let ctrlNode = ReactDOM.findDOMNode(ctrl);
         expect(ctrlNode.getAttribute("data-visible")).toEqual("false");
         store.dispatch(SPLASH_ACTIONS.START(GAME_MODES.COMPUTER_VS_COMPUTER));
         ctrlNode = ReactDOM.findDOMNode(ctrl);
         expect(ctrlNode.getAttribute("data-visible")).toEqual("true");
         jest.runOnlyPendingTimers();
         expect(ctrl.state.roundCardVisible).toEqual(true);
         let v = TestUtils.findRenderedDOMComponentWithClass(ctrl,"next-round-btn");
         TestUtils.Simulate.click(v,{}); 
         expect(ctrl.state.roundCardVisible).toEqual(false); 
         expect(ctrl.state.round).toEqual(2);
         jest.runOnlyPendingTimers();
         expect(ctrl.state.roundCardVisible).toEqual(true);
         TestUtils.Simulate.click(v,{}); 
         expect(ctrl.state.round).toEqual(3);
    });
    
    it("should render GamePlayCtrl computer vs user",function(){
        let store = Store.create(Immutable.Map({}),Combiner.combine(),[],false,true);
        var obj = {
            onInfoClick:function(){
                
            }
        };
        spyOn(obj,'onInfoClick').and.callThrough(); 
        const ctrl = TestUtils.renderIntoDocument(
            <GamePlayCtrl store={store} onInfoClick={obj.onInfoClick} />
        );
        
         let ctrlNode = ReactDOM.findDOMNode(ctrl);
         expect(ctrlNode.getAttribute("data-visible")).toEqual("false");
         store.dispatch(SPLASH_ACTIONS.START(GAME_MODES.PLAYER_VS_COMPUTER));
         ctrlNode = ReactDOM.findDOMNode(ctrl);
         expect(ctrlNode.getAttribute("data-visible")).toEqual("true");
         jest.runOnlyPendingTimers();
         let vx = TestUtils.findRenderedDOMComponentWithClass(ctrl,"btn-item-0");
         TestUtils.Simulate.click(vx,{}); 
         expect(ctrl.state.roundCardVisible).toEqual(true);
         let v = TestUtils.findRenderedDOMComponentWithClass(ctrl,"next-round-btn");
         TestUtils.Simulate.click(v,{}); 
         expect(ctrl.state.roundCardVisible).toEqual(false); 
         expect(ctrl.state.round).toEqual(2);
         jest.runOnlyPendingTimers();
         TestUtils.Simulate.click(vx,{}); 
         expect(ctrl.state.roundCardVisible).toEqual(true);
         TestUtils.Simulate.click(v,{}); 
         expect(ctrl.state.round).toEqual(3);
    });
    
}); 