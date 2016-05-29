jest.unmock('../es6/ui/Dialog');
jest.unmock('../es6/ui/IconButton');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {Dialog} from '../es6/ui/Dialog'; 

describe("Testing Dialog component",function(){
    it("Should render Dialog with the provided className",function(){
        var obj = {
            onClose:function(){
                
            },
            onBackdropClick:function(){
                
            }
        };
        spyOn(obj,'onClose').and.callThrough();
        spyOn(obj,'onBackdropClick').and.callThrough();  
        const component = TestUtils.renderIntoDocument(
            <Dialog className="my-Dialog" onClose={obj.onClose} onBackdropClick={obj.onBackdropClick} visible={true}>
                <span className="my-content">Hello</span>
            </Dialog>
        );
        const DialogNode = ReactDOM.findDOMNode(component);
        expect(DialogNode.className.indexOf("my-Dialog")).not.toEqual(-1);
        expect(DialogNode.getAttribute("data-visible")).toEqual("true"); 
        const closeButtonNode = TestUtils.findRenderedDOMComponentWithClass(component,'of-close-button'); 
        TestUtils.Simulate.click(closeButtonNode,{});
        const backdropNode = TestUtils.findRenderedDOMComponentWithClass(component,'of-backdrop'); 
        TestUtils.Simulate.click(backdropNode,{});
        expect(obj.onBackdropClick).toHaveBeenCalled();  
        const contentNode = TestUtils.findRenderedDOMComponentWithClass(component,'my-content');
        expect(contentNode.textContent).toEqual("Hello");
        // expect(checkIconExists).toThrow();
    });
    
    
    
    
});