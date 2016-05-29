import * as React from 'react';
import * as Immutable from 'immutable';
import { ControllerView } from 'strikejs';
import { ACTIONS } from './Actions';
import { GAME_MODES } from '../../constants';
import { SplashScreenInitialState, STATE_KEY } from './StateAndProps';
import { Reducer } from './Reducer';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { Logo } from '../../ui/Logo';
export class SplashScreenCtrl extends ControllerView {
    constructor(props) {
        super(props, STATE_KEY);
        this.state = SplashScreenInitialState;
        //bind methods to "this" to improve performance i.e. this helps with Reacts diff algorithm as the methods will have the same refernces every time. 
        this.onModeSelected = this.onModeSelected.bind(this);
    }
    onModeSelected(type) {
        this._storeInstance.dispatch(ACTIONS.START(type));
    }
    componentDidMount() {
        super.componentDidMount();
        this._storeInstance.replaceStateAt(STATE_KEY, Immutable.Map(SplashScreenInitialState));
        this._storeInstance.combiner.addReducer(STATE_KEY, Reducer);
    }
    shouldComponentUpdate(props, state) {
        return state.visible !== this.state.visible;
    }
    render() {
        return (React.createElement("div", {className: "window-screen", id: "SplashScreenCtrl", key: "container-1", "data-visible": this.state.visible}, React.createElement("div", {className: "screen-wrapper", key: "container-2"}, React.createElement(IconButton, {className: "info-button", icon: "fa fa-info", onClick: this.props.onOpenInfo}), React.createElement(Logo, {image: "/img/rock-paper-scissors-logo.png"}), React.createElement("p", null, "Rock-paper-scissors is a zero-sum hand game usually played between two people. Each player simultaneously forms one of three shapes with an outstretched hand. "), React.createElement(Button, {className: "play-button", label: "Play", onClick: this.onModeSelected, userData: GAME_MODES.PLAYER_VS_COMPUTER}), React.createElement(Button, {className: "play-button simulate", label: "Simulate", onClick: this.onModeSelected, userData: GAME_MODES.COMPUTER_VS_COMPUTER}))));
    }
}
//# sourceMappingURL=SplashScreen.js.map