jest.unmock("../es6/services/GameModels"); 
import {ComputerPlayer,UserPlayer,Player} from '../es6/services/GameModels'; 

import {GAME_MODES,PLAY_STATES,PLAYER_TYPE} from '../es6/constants';

describe("Testing player types",function(){
    it("Should set label and score on generic players",function(){
        let player = new Player(PLAYER_TYPE.COMPUTER,"Player 1"); 
        expect(player.getScore()).toEqual(0); 
        expect(player._type).toEqual(PLAYER_TYPE.COMPUTER);
        expect(player.getLabel()).toEqual("Player 1"); 
        player.addPoints(2);
        expect(player.getScore()).toEqual(2); 
        player.reset();
        expect(player.getScore()).toEqual(0); 
        expect(player.is(PLAYER_TYPE.USER)).toEqual(false);
        expect(player.is(PLAYER_TYPE.COMPUTER)).toEqual(true);
    });
    it("Should set label and score on computer players",function(){
        let player = new ComputerPlayer("Computer 1");
        expect(player.getLabel()).toEqual("Computer 1");
        expect(player.getScore()).toEqual(0); 
        expect(player._type).toEqual(PLAYER_TYPE.COMPUTER);  
        player.play();
        let state = player.state; 
        for(var i=0;i<10;i++){
            player.play(); 
        }
        
        // expect(state).not.toEqual(player.state); 
        player.setScore(3);
        expect(player.getScore()).toEqual(3);
        
        
    }); 
    
    it("Should set label and score on user players",function(){
        let player = new UserPlayer("User 1");
        expect(player.getLabel()).toEqual("User 1");
        expect(player.getScore()).toEqual(0); 
        expect(player._type).toEqual(PLAYER_TYPE.USER);
        player.play(1); 
        expect(player.state).toEqual(PLAY_STATES[1]);
        function thrower(){
            player.play(10); 
        }
        expect(thrower).toThrow();
    });
}); 