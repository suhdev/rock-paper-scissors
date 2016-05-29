import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 
import * as Immutable from 'immutable';
import {ControllerView} from 'strikejs';
import {ACTIONS} from './Actions'; 
import {GAME_MODES} from '../../constants'; 
import {ACTIONS as APP_ACTIONS} from '../App/Actions'; 
import {SplashScreenInitialState,SplashScreenProps,SplashScreenState,STATE_KEY} from './StateAndProps';
import {Reducer} from './Reducer'; 
import {Button} from '../../ui/Button'; 
import {IconButton} from '../../ui/IconButton'; 
import {Logo} from '../../ui/Logo';
 
export class SplashScreenCtrl extends ControllerView<SplashScreenProps,SplashScreenState>{
    constructor(props:SplashScreenProps){
        super(props,STATE_KEY); 
        this.state = SplashScreenInitialState;
        //bind methods to "this" to improve performance i.e. this helps with Reacts diff algorithm as the methods will have the same refernces every time. 
        this.onModeSelected = this.onModeSelected.bind(this);  
    }
    
    
    
    onModeSelected(type:string){
        this._storeInstance.dispatch(ACTIONS.START(type)); 
    }
    
    componentDidMount(){
        super.componentDidMount();
        this._storeInstance.replaceStateAt(STATE_KEY,Immutable.Map(SplashScreenInitialState));
        this._storeInstance.combiner.addReducer(STATE_KEY,Reducer); 
    }
    
    shouldComponentUpdate(props:SplashScreenProps,state:SplashScreenState){
        return state.visible !== this.state.visible;
    }
    
    render(){
        return (
            <div className="window-screen" id="SplashScreenCtrl" key="container-1" data-visible={this.state.visible}>
                <div className="screen-wrapper" key="container-2">
                    <IconButton className="info-button" icon="fa fa-info" onClick={this.props.onOpenInfo} />
                    <Logo image="/img/rock-paper-scissors-logo.png" />
                    <p>Rock-paper-scissors is a zero-sum hand game usually played between two people. Each player simultaneously forms one of three shapes with an outstretched hand. </p>
                    <Button className="play-button" label="Play" onClick={this.onModeSelected} userData={GAME_MODES.PLAYER_VS_COMPUTER} />
                    <Button className="play-button simulate" label="Simulate" onClick={this.onModeSelected} userData={GAME_MODES.COMPUTER_VS_COMPUTER} />
                </div>
            </div>
        );
    }
}