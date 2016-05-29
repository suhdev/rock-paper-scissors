import {PLAYER_TYPE,PLAY_STATES} from '../constants';
import {Store} from 'strikejs';  
import * as Promise from 'bluebird'; 
import {ACTIONS} from '../controllers/GamePlay/Actions'; 
export interface GamePlayer {
    _score:number;
    _type:number;
    play(n?:number):PlayState;
    getScore():number;  
    addPoints:(e:number)=>void; 
    reset():void; 
}

export interface PlayState {
    value:number;
    beats:number;
    label:string;
    icon:string;
}

export abstract class Player implements GamePlayer {
    _type:number;
    _score:number;
    _label:string;
    state:PlayState;
    constructor(type:number,label:string){
        this._type = type;  
        this._score = 0;
        this.state = null;
        this._label = label;
    }
    
    getLabel(){
        return this._label;
    }
    
    setScore(score:number){
        this._score = score;
    }
    
    is(type:number){
        return this._type === type; 
    }
    
    getScore(){
        return this._score;
    }
    
    reset(){
        this._score = 0; 
    }
    
    addPoints(n:number){
        this._score += n; 
    }
    
    abstract play():PlayState;
}

export class ComputerPlayer extends Player {
    _type:number;
    _score:number;
    constructor(label:string){
        super(PLAYER_TYPE.COMPUTER,label); 
    }
    
    play(n?:number):PlayState{
       let v = Math.floor(Math.random()*5423) % 3;
       return this.state = PLAY_STATES[v]; 
    }
    
    toString():string{
        return this._label +" played "+(this.state && this.state.label); 
    }
} 

export class UserPlayer extends Player{ 
    constructor(label:string){
        super(PLAYER_TYPE.USER,label);
    }
    
    play(n?:number):PlayState{
        if (n < PLAY_STATES.length){
            return this.state = PLAY_STATES[n]; 
        }
        throw new Error("Invalid play state provided.");
    }
    
    toString():string{
        return "You played "+(this.state && this.state.label); 
    }
}
