jest.unmock('../es6/ui/IconButton');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {IconButton} from '../es6/ui/IconButton'; 

describe("Testing IconButton component",function(){
    it("Should render icon button with the provided className and icon",function(){
        const button = TestUtils.renderIntoDocument(
            <div><IconButton className="my-icon" icon="fa-user" /></div>
        );
        const buttonNode = ReactDOM.findDOMNode(button);
        expect(buttonNode.children[0].className.indexOf("my-icon")).not.toEqual(-1);
        expect(buttonNode.children[0].children[0].className.indexOf("fa-user")).not.toEqual(-1); 
    });
    
    it("Should attach onClick event to Button component",function(){ 
        var obj = {
            onClick:function(e){
                
            }
        }
        spyOn(obj,'onClick').and.callThrough(); 
        const button = TestUtils.renderIntoDocument(
            <div><IconButton className="my-icon" icon="fa-user" onClick={obj.onClick}/></div>
        );
        const buttonNode = ReactDOM.findDOMNode(button);
        TestUtils.Simulate.click(buttonNode.children[0],123);
        expect(obj.onClick).toHaveBeenCalled();  
        
    });
    
    
});