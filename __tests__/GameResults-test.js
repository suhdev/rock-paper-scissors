jest.unmock("../es6/controllers/GamePlay/GameResults");
jest.unmock("../es6/services/GameModels");

import {Player,UserPlayer,ComputerPlayer} from '../es6/services/GameModels';
import {formatGameFinishText,formatHandsText,formatRoundWinnerText} from '../es6/controllers/GamePlay/GameResults';
import {GamePlayInitialState,STATE_KEY} from '../es6/controllers/GamePlay/StateAndProps';
import {GAME_MODES,PLAY_STATES} from '../es6/constants'; 
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe("Testing GameResults functions",function(){
    it("should formatGameFinishText",function(){
        var player = new UserPlayer("Player 1");
        var computer = new ComputerPlayer("Computer"); 
        player.state = PLAY_STATES[0];
        player.setScore(3);
        computer.state = PLAY_STATES[1];
        computer.setScore(1);  
        expect(formatGameFinishText(player,computer)).toEqual("Player 1 wins the game.");
        player.setScore(0);
        expect(formatGameFinishText(player,computer)).toEqual("Computer wins the game.");
        player.setScore(1);
        expect(formatGameFinishText(player,computer)).toEqual("It is a draw. No one wins.");
        player.setScore(0);
        expect(formatGameFinishText(computer,player)).toEqual("Sorry, you lose! Play again, you might get lucky! Although I doubt it.");
        player.setScore(3);
        expect(formatGameFinishText(computer,player)).toEqual("Congratulations, you win!");
        
    });
    
    it("should formatRoundWinnerText",function(){
        var player = new UserPlayer("Player 1");
        var computer = new ComputerPlayer("Computer"); 
        player.state = PLAY_STATES[0];
        player.setScore(2);
        computer.state = PLAY_STATES[1];
        computer.setScore(1);  
        expect(formatRoundWinnerText(player,computer)).toEqual("Player 1 wins this round.");
        player.setScore(0);
        computer.state = player.state; 
        player.state = PLAY_STATES[1]; 
        expect(formatRoundWinnerText(player,computer)).toEqual("Computer wins this round.");
        computer.state = player.state;
        expect(formatRoundWinnerText(player,computer)).toEqual("Its a draw, ");
    });
    
    it("should formatHandsText",function(){
        var player = new UserPlayer("Player 1");
        var computer = new ComputerPlayer("Computer"); 
        player.state = PLAY_STATES[0];
        player.setScore(2);
        computer.state = PLAY_STATES[1];
        computer.setScore(1);  
        expect(formatHandsText(player,computer)).toEqual("Computer played Scissors while Player 1 played Rock");
        player.setScore(0);
        computer.state = player.state; 
        player.state = PLAY_STATES[1]; 
        expect(formatHandsText(player,computer)).toEqual("Computer played Rock while Player 1 played Scissors");
        computer.state = player.state;
        expect(formatHandsText(player,computer)).toEqual("Computer played Scissors while Player 1 played Scissors");
    });
}); 