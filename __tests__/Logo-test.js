jest.unmock('../es6/ui/Logo');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {Logo} from '../es6/ui/Logo'; 

describe("Testing Logo component",function(){
    it("Should render with the provided image",function(){
        const logo = TestUtils.renderIntoDocument(
            <Logo image="/img/rock-paper-scissors-logo.png" />
        );
        const logoNode = ReactDOM.findDOMNode(logo);
        expect(logoNode.className.trim()).toEqual('logo');
        const imgNode = TestUtils.findRenderedDOMComponentWithTag(logo,'img')
        expect(imgNode.src).toEqual("/img/rock-paper-scissors-logo.png"); 
    });
    
    it("Should render with the provided className",function(){
        const logo = TestUtils.renderIntoDocument(
            <Logo className="test-class" />
        );
        const logoNode = ReactDOM.findDOMNode(logo);
        expect(logoNode.className.trim()).toEqual('logo test-class'); 
    });
    
    it("Should render with the provided className and image",function(){
        const logo = TestUtils.renderIntoDocument(
            <Logo className="test-class" image="/img/rock-paper-scissors-logo.png" />
        );
        const logoNode = ReactDOM.findDOMNode(logo);
        expect(logoNode.className.trim()).toEqual('logo test-class');
        const imgNode = TestUtils.findRenderedDOMComponentWithTag(logo,'img')
        expect(imgNode.src).toEqual("/img/rock-paper-scissors-logo.png");
    }); 
});