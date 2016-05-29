import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 
import * as Immutable from 'immutable';
import {ControllerView} from 'strikejs';
import {AppInitialState,AppProps,AppState,STATE_KEY} from './StateAndProps';
import {Reducer} from './Reducer'; 
import {ACTIONS} from './Actions'; 
import {SplashScreenCtrl} from '../SplashScreen/SplashScreen';
import {GamePlayCtrl} from '../GamePlay/GamePlay'; 
import {Dialog} from '../../ui/Dialog';
 
export class AppCtrl extends ControllerView<AppProps,AppState>{
    constructor(props:AppProps){
        super(props,STATE_KEY); 
        this.state = AppInitialState;
        this.onCloseInfo = this.onCloseInfo.bind(this); 
        this.onOpenInfo = this.onOpenInfo.bind(this); 
    }
    
    onCloseInfo(){
        this._storeInstance.dispatch(ACTIONS.INFO_ACTION(false));
    }
    
    onOpenInfo(){
        this._storeInstance.dispatch(ACTIONS.INFO_ACTION(true)); 
    }
    
    componentDidMount(){
        super.componentDidMount();
        this._storeInstance.replaceStateAt(STATE_KEY,Immutable.Map(AppInitialState));
        this._storeInstance.combiner.addReducer(STATE_KEY,Reducer); 
    }
    
    shouldComponentUpdate(props:AppProps,state:AppState){
        return state.infoDialogVisible !== this.state.infoDialogVisible;
    }
    
    render(){
        let inj = this.props.injector; 
        return (
            <div className="app-container" id="AppCtrl">
                <SplashScreenCtrl store={this.props.store} onOpenInfo={this.onOpenInfo} />
                <GamePlayCtrl 
                    store={this.props.store} 
                    onOpenInfo={this.onOpenInfo} />
                <Dialog onBackdropClick={this.onCloseInfo} 
                    onClose={this.onCloseInfo} 
                    className="info-dialog"
                    visible={this.state.infoDialogVisible}>
                    <h2 className="info-title">Instructions</h2>
                    <div className="info-content">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Rock-paper-scissors.svg/460px-Rock-paper-scissors.svg.png" />
                    </div>
                </Dialog>
            </div>
        );
    }
}