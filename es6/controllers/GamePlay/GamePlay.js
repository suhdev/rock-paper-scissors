import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Immutable from 'immutable';
import { ControllerView } from 'strikejs';
import { ACTIONS } from './Actions';
import { GAME_MODES, PLAYER_TYPE, PLAY_STATES, SIMULATION_TIMEOUT, COMPUTER_HAND_CHANGE_INTERVAL } from '../../constants';
import { GamePlayInitialState, STATE_KEY } from './StateAndProps';
import { Reducer } from './Reducer';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { Logo } from '../../ui/Logo';
import { Dialog } from '../../ui/Dialog';
import { formatGameFinishText, formatHandsText, formatRoundWinnerText } from './GameResults';
export class GamePlayCtrl extends ControllerView {
    /**
     * Creates an instance of GamePlayCtrl.
     *
     * @param {GamePlayProps} props
     */
    constructor(props) {
        super(props, STATE_KEY);
        //setting the initial state of the component such that the component is initialied at a specific state. 
        this.state = GamePlayInitialState;
        //binding methods to "this" to improve performance 
        //i.e. this helps with Reacts diff algorithm as the methods will have the same refernces every time they're passed through props.   
        this.onChoice = this.onChoice.bind(this);
        this.onNextRound = this.onNextRound.bind(this);
        this.onRestart = this.onRestart.bind(this);
        this.onMainMenu = this.onMainMenu.bind(this);
    }
    /**
     * ControllerView internally attaches itself to the store in its componentDidMount method and hence calling super.componentDidMount().
     * In future releases of StrikeJS the following two lines can be included inside ControllerView componentDidMount method.
     * The Reducer however must be passed to the super class from the constructor.
     */
    componentDidMount() {
        super.componentDidMount();
        //the first line wraps the initial state with an Immutable Map [for performance reasons] and attaches it to the store at the component state key. 
        this._storeInstance.replaceStateAt(STATE_KEY, Immutable.Map(GamePlayInitialState));
        //this lines attaches reducer to the store's combiner at the component state key. 
        this._storeInstance.combiner.addReducer(STATE_KEY, Reducer);
    }
    /**
     * This is implemented mainly for performance reasons to make sure no unnessary rendering happen.
     *
     * @param {GamePlayProps} props the props that will be passed to the component on the next update.
     * @param {GamePlayState} state the states that will be passed to the component on the next update.
     * @returns true or false depending on whether the component needs to update.
     */
    shouldComponentUpdate(props, state) {
        return state.visible !== this.state.visible ||
            state.finishCardVisible !== this.state.finishCardVisible ||
            state.roundCardVisible !== this.state.roundCardVisible ||
            state.gameWinner !== this.state.gameWinner ||
            state.roundWinner !== this.state.roundWinner ||
            state.round !== this.state.round;
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
     * Called everytime the user selects an answer, or the simulatation timer times out to trigger a state change.
     * @param e PlayState the chosen state either by the user or the computer
     */
    onChoice(e) {
        this._pause();
        this._storeInstance.dispatch(ACTIONS.CHOICE(e));
    }
    /**
     * Called everytime the user clicks on the Next Round button.
     */
    onNextRound() {
        this._storeInstance.dispatch(ACTIONS.NEXT_ROUND);
    }
    /**
     * Called when the user clicks on Play Again button.
     */
    onRestart() {
        if (this.state.round > 1) {
            this._pause();
            this._storeInstance.dispatch(ACTIONS.RESTART);
        }
    }
    /**
     * Resumes game play. Mainly checks if the game is being played in simulation modes it will update both players states,
     * otherwise, it will only update the first player state i.e. icon classes and labels.
     */
    _resume() {
        //two random starts such that the two computer players [if in simulation mode], will have different initial states. 
        let start1 = Math.floor(Math.random() * 3455) % PLAY_STATES.length, start2 = Math.floor(Math.random() * 6744) % PLAY_STATES.length, gameMode = this.state.gameMode, icon = ReactDOM.findDOMNode(this.refs['computerIcon']), label = ReactDOM.findDOMNode(this.refs['computerLabel']), 
        //icon2 and label2 will only be available if the game is in simulation mode
        icon2 = ReactDOM.findDOMNode(this.refs['computerIcon2']), label2 = ReactDOM.findDOMNode(this.refs['computerLabel2']);
        if (this.timer) {
            clearInterval(this.timer);
        }
        if (gameMode === GAME_MODES.PLAYER_VS_COMPUTER) {
            this.timer = setInterval(() => {
                icon.className = PLAY_STATES[start1].icon;
                label.innerHTML = PLAY_STATES[start1].label;
                start1++;
                if (start1 === PLAY_STATES.length) {
                    start1 = 0;
                }
            }, COMPUTER_HAND_CHANGE_INTERVAL);
        }
        else {
            this.timer = setInterval(() => {
                icon.className = PLAY_STATES[start1].icon;
                label.innerHTML = PLAY_STATES[start1].label;
                start1++;
                if (start1 === PLAY_STATES.length) {
                    start1 = 0;
                }
                icon2.className = PLAY_STATES[start2].icon;
                label2.innerHTML = PLAY_STATES[start2].label;
                start2++;
                if (start2 === PLAY_STATES.length) {
                    start2 = 0;
                }
            }, COMPUTER_HAND_CHANGE_INTERVAL);
            this.timeout = setTimeout(() => {
                if (this.timer) {
                    this.onChoice(PLAY_STATES[start2]);
                }
            }, SIMULATION_TIMEOUT);
        }
    }
    /**
     * Pauses the currently active timer and set the timer field to null.
     */
    _pause() {
        clearInterval(this.timer);
        clearTimeout(this.timeout);
        this.timer = null;
    }
    /**
     * Called on the second update onward, mainly used to resume the game timer after being paused for either game final result or round results.
     *
     * @param {GamePlayProps} prevProps previous component props.
     * @param {GamePlayState} prevState previous component state.
     */
    componentDidUpdate(prevProps, prevState) {
        if ((this.state.playing && this.state.playing !== prevState.playing) ||
            (this.state.playing && this.timer === null)) {
            this._resume();
        }
        else {
            this._pause();
        }
    }
    /**
     * Called when the user clicks on the Main Menu button.
     */
    onMainMenu() {
        this._pause();
        this._storeInstance.dispatch(ACTIONS.MAIN_MENU);
    }
    /**
     * Renders the component.
     */
    render() {
        let state = this.state, player1 = state.player1, player2 = state.player2, roundWinner = state.roundWinner, gameWinner = state.gameWinner, gameMode = state.gameMode, roundText = state.roundWinner === player2 ? "You win this round!" : (state.roundWinner === player1) ? "You lose this round!" : "Draw", computerBtn = (React.createElement("div", {className: "of-btn info", key: "computer-btn-2"}, React.createElement("i", {className: player1.state && player1.state.icon, ref: "computerIcon2"}), React.createElement("span", {ref: "computerLabel2"}, player2.state && player2.state.label))), btns = PLAY_STATES.map((e, i) => {
            return (React.createElement(Button, {key: e.label, label: e.label, icon: e.icon, className: "info btn-item-" + i, onClick: this.onChoice, userData: e}));
        });
        return (React.createElement("div", {className: "window-screen", id: "GamePlayCtrl", key: "container-1x", "data-visible": this.state.visible}, React.createElement("div", {className: "screen-wrapper", key: "container-2x"}, React.createElement(Logo, {image: "/img/rock-paper-scissors-logo.png", className: "app-logo"}), React.createElement("div", {className: "game-title"}, player2.getLabel() + " vs " + player1.getLabel()), React.createElement("div", {className: "game-round-count"}, "Round ", state.round, " of ", state.maxRounds, " "), React.createElement(IconButton, {onClick: this.onRestart, icon: "fa fa-rotate-left fa-2x", className: "restart-button"}), React.createElement(IconButton, {onClick: this.onMainMenu, icon: "fa fa-arrow-circle-left fa-2x", className: "mainmenu-button"}), React.createElement("div", {className: "player-section player-1"}, React.createElement("h2", {className: "section-title"}, player1.getLabel(), " (", player1.getScore(), ")"), React.createElement("div", {className: "of-btn"}, React.createElement("i", {className: player1.state && player1.state.icon, ref: "computerIcon"}), React.createElement("span", {ref: "computerLabel"}, player1.state && player1.state.label))), React.createElement("div", {className: player2.is(PLAYER_TYPE.USER) ? "player-section player-2" : "player-section player-2 computer"}, React.createElement("h2", {className: "section-title"}, player2.getLabel(), " (", player2.getScore(), ")"), gameMode === GAME_MODES.PLAYER_VS_COMPUTER ? btns : computerBtn), React.createElement(Dialog, {visible: state.roundCardVisible, onClose: this.onNextRound}, React.createElement("h2", {className: "round-title"}, state.round, " of ", state.maxRounds), React.createElement("div", {className: "round-description", key: "round-hands"}, formatHandsText(player1, player2)), React.createElement("div", {className: "round-description", key: "round-result"}, formatRoundWinnerText(player1, player2)), React.createElement(Button, {onClick: this.onNextRound, label: "Next Round", className: "next-round-btn"})), React.createElement(Dialog, {visible: state.finishCardVisible, onClose: this.onRestart}, React.createElement("h2", {className: "round-title"}, state.round, " of ", state.maxRounds), React.createElement("div", {className: "round-description", key: "round-hands"}, formatHandsText(player1, player2)), React.createElement("div", {className: "round-description", key: "round-result-2"}, formatGameFinishText(player1, player2)), React.createElement(Button, {onClick: this.onRestart, label: "Play Again"}), React.createElement(Button, {onClick: this.onMainMenu, label: "Main Menu"})))));
    }
}
//# sourceMappingURL=GamePlay.js.map