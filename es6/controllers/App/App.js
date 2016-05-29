//This file includes the AppCtrl component code. 
import * as React from 'react';
import * as Immutable from 'immutable';
import { ControllerView } from 'strikejs';
import { AppInitialState, STATE_KEY } from './StateAndProps';
import { Reducer } from './Reducer';
import { ACTIONS } from './Actions';
import { SplashScreenCtrl } from '../SplashScreen/SplashScreen';
import { GamePlayCtrl } from '../GamePlay/GamePlay';
import { Dialog } from '../../ui/Dialog';
/**
 * AppCtrl is a controller ReactJS component that serves as the application container. It extends {ControllerView} which is a
 * class defined in StrikeJS and provides integration with StrikeJS's store system.
 *
 * @export
 * @class AppCtrl
 * @extends {ControllerView<AppProps, AppState>}
 */
export class AppCtrl extends ControllerView {
    constructor(props) {
        super(props, STATE_KEY);
        this.state = AppInitialState;
        this.onCloseInfo = this.onCloseInfo.bind(this);
        this.onOpenInfo = this.onOpenInfo.bind(this);
    }
    /**
     * Called whenever the close button on the info Dialog is clicked.
     */
    onCloseInfo() {
        this._storeInstance.dispatch(ACTIONS.INFO_ACTION(false));
    }
    /**
     * Called whenever the info button is clicked.
     */
    onOpenInfo() {
        this._storeInstance.dispatch(ACTIONS.INFO_ACTION(true));
    }
    /**
     * To gracefully remove component from the application state and the combiner.
     * Again in future releases of StrikeJS these two lines can be moved to the ControllerView componentWillUnmount method.
     */
    componentWillUnmount() {
        this._storeInstance.deleteStateAt(STATE_KEY);
        this._storeInstance.combiner.removeReducer(STATE_KEY);
    }
    /**
     * ControllerView internally attaches itself to the store in its componentDidMount method and hence calling super.componentDidMount().
     * In future releases of StrikeJS the following two lines can be included inside ControllerView componentDidMount method.
     * The Reducer however must be passed to the super class from the constructor.
     */
    componentDidMount() {
        super.componentDidMount();
        this._storeInstance.replaceStateAt(STATE_KEY, Immutable.Map(AppInitialState));
        this._storeInstance.combiner.addReducer(STATE_KEY, Reducer);
    }
    /**
     * This method is implemented for performance reasons, as it helps triggering a full tree re-render when there is no need to do so.
     */
    shouldComponentUpdate(props, state) {
        return state.infoDialogVisible !== this.state.infoDialogVisible;
    }
    render() {
        return (React.createElement("div", {className: "app-container", id: "AppCtrl"}, React.createElement(SplashScreenCtrl, {store: this.props.store, onOpenInfo: this.onOpenInfo}), React.createElement(GamePlayCtrl, {store: this.props.store, onOpenInfo: this.onOpenInfo}), React.createElement(Dialog, {onBackdropClick: this.onCloseInfo, onClose: this.onCloseInfo, className: "info-dialog", visible: this.state.infoDialogVisible}, React.createElement("h2", {className: "info-title"}, "Instructions"), React.createElement("div", {className: "info-content"}, React.createElement("img", {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Rock-paper-scissors.svg/460px-Rock-paper-scissors.svg.png"})))));
    }
}
//# sourceMappingURL=App.js.map