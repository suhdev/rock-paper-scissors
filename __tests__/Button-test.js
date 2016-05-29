jest.unmock('../es6/ui/Button');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {Button} from '../es6/ui/Button'; 

describe("Testing Button component",function(){
    it("Should render button with the provided className, label",function(){
        const button = TestUtils.renderIntoDocument(
            <Button className="my-button" label="Test Button" />
        );
        const buttonNode = ReactDOM.findDOMNode(button);
        expect(buttonNode.className.indexOf("my-button")).not.toEqual(-1);
        const labelNode = TestUtils.findRenderedDOMComponentWithTag(button,'span')
        expect(labelNode.textContent).toEqual("Test Button"); 
        function checkIconExists(){
            const iconNode = TestUtils.findRenderedDOMComponentWithTag(button,'i')
        }
        expect(checkIconExists).toThrow();
    });
    
    it("Should render button with the provided className, label, and icon",function(){
        const button = TestUtils.renderIntoDocument(
            <Button className="my-button" label="Test Button" icon="fa fa-user" />
        );
        const buttonNode = ReactDOM.findDOMNode(button);
        expect(buttonNode.className.indexOf("my-button")).not.toEqual(-1);
        const labelNode = TestUtils.findRenderedDOMComponentWithTag(button,'span')
        expect(labelNode.textContent).toEqual("Test Button"); 
         function checkIconExists(){
            const iconNode = TestUtils.findRenderedDOMComponentWithTag(button,'i')
        }
        expect(checkIconExists).not.toThrow();
    });
    
    it("Should render button with the provided className, label, and icon using iconRenderer",function(){
        var obj = {
            renderIcon:function(){
            return (<p className="icon-container">Test Icon</p>);
                
            }
        };
        spyOn(obj,'renderIcon').and.callThrough();  
        const button = TestUtils.renderIntoDocument(
            <Button className="my-button" label="Test Button" iconRenderer={obj.renderIcon} />
        );
        const buttonNode = ReactDOM.findDOMNode(button);
        expect(buttonNode.className.indexOf("my-button")).not.toEqual(-1);
        const labelNode = TestUtils.findRenderedDOMComponentWithTag(button,'span')
        expect(labelNode.textContent).toEqual("Test Button"); 
        function checkIconExists(){
            const iconNode = TestUtils.findRenderedDOMComponentWithTag(button,'i')
        }
        function checkIconWithPExists(){
            const iconNode = TestUtils.findRenderedDOMComponentWithTag(button,'p')
        }
        expect(checkIconExists).toThrow();
        expect(checkIconWithPExists).not.toThrow(); 
    });
    
    it("Should attach onClick event to Button component",function(){ 
        var obj = {
            onClick:function(e){
                
            }
        }
        spyOn(obj,'onClick').and.callThrough(); 
        const button = TestUtils.renderIntoDocument(
            <Button className="my-button" label="Test Button" onClick={obj.onClick}/>
        );
        const buttonNode = ReactDOM.findDOMNode(button);
        TestUtils.Simulate.click(buttonNode,123);
        expect(obj.onClick).toHaveBeenCalled();  
        
    });
    
    it("Should pass userData to the onClick handler",function(){ 
        var userData = {
            firstName:'John',
            lastName:'Doe', 
        },fnResult = null; 
        var obj = {
            onClick:function(e){
                fnResult = e;
            }
        }
        spyOn(obj,'onClick').and.callThrough(); 
        const button = TestUtils.renderIntoDocument(
            <Button className="my-button" label="Test Button" userData={userData} onClick={obj.onClick}/>
        );
        const buttonNode = ReactDOM.findDOMNode(button);
        TestUtils.Simulate.click(buttonNode,{});
        expect(obj.onClick).toHaveBeenCalled();
        expect(fnResult).toEqual(userData);  
    });
    
    it("Should render icon through",function(){ 
        var userData = {
            firstName:'John',
            lastName:'Doe', 
        },fnResult = null; 
        var obj = {
            onClick:function(e){
                fnResult = e;
            }
        }
        spyOn(obj,'onClick').and.callThrough(); 
        const button = TestUtils.renderIntoDocument(
            <Button className="my-button" label="Test Button" userData={userData} onClick={obj.onClick}/>
        );
        const buttonNode = ReactDOM.findDOMNode(button);
        TestUtils.Simulate.click(buttonNode,{});
        expect(obj.onClick).toHaveBeenCalled();
        expect(fnResult).toEqual(userData);  
    });
    
    
});