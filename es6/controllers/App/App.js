import * as React from 'react';
import * as Immutable from 'immutable';
import { ControllerView } from 'strikejs';
import { AppInitialState, STATE_KEY } from './StateAndProps';
import { Reducer } from './Reducer';
import { ACTIONS } from './Actions';
import { SplashScreenCtrl } from '../SplashScreen/SplashScreen';
import { GamePlayCtrl } from '../GamePlay/GamePlay';
import { Dialog } from '../../ui/Dialog';
export class AppCtrl extends ControllerView {
    constructor(props) {
        super(props, STATE_KEY);
        this.state = AppInitialState;
        this.onCloseInfo = this.onCloseInfo.bind(this);
        this.onOpenInfo = this.onOpenInfo.bind(this);
    }
    onCloseInfo() {
        this._storeInstance.dispatch(ACTIONS.INFO_ACTION(false));
    }
    onOpenInfo() {
        this._storeInstance.dispatch(ACTIONS.INFO_ACTION(true));
    }
    componentDidMount() {
        super.componentDidMount();
        this._storeInstance.replaceStateAt(STATE_KEY, Immutable.Map(AppInitialState));
        this._storeInstance.combiner.addReducer(STATE_KEY, Reducer);
    }
    shouldComponentUpdate(props, state) {
        return state.infoDialogVisible !== this.state.infoDialogVisible;
    }
    render() {
        let inj = this.props.injector;
        return (React.createElement("div", {className: "app-container", id: "AppCtrl"}, React.createElement(SplashScreenCtrl, {store: this.props.store, onOpenInfo: this.onOpenInfo}), React.createElement(GamePlayCtrl, {store: this.props.store, onOpenInfo: this.onOpenInfo}), React.createElement(Dialog, {onBackdropClick: this.onCloseInfo, onClose: this.onCloseInfo, className: "info-dialog", visible: this.state.infoDialogVisible}, React.createElement("h2", {className: "info-title"}, "Instructions"), React.createElement("div", {className: "info-content"}, React.createElement("img", {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Rock-paper-scissors.svg/460px-Rock-paper-scissors.svg.png"})))));
    }
}
//# sourceMappingURL=App.js.map