import { PLAYER_TYPE, PLAY_STATES } from '../constants';
export class Player {
    constructor(type, label) {
        this._type = type;
        this._score = 0;
        this.state = null;
        this._label = label;
    }
    getLabel() {
        return this._label;
    }
    setScore(score) {
        this._score = score;
    }
    is(type) {
        return this._type === type;
    }
    getScore() {
        return this._score;
    }
    reset() {
        this._score = 0;
    }
    addPoints(n) {
        this._score += n;
    }
}
export class ComputerPlayer extends Player {
    constructor(label) {
        super(PLAYER_TYPE.COMPUTER, label);
    }
    play(n) {
        let v = Math.floor(Math.random() * 5423) % 3;
        return this.state = PLAY_STATES[v];
    }
    toString() {
        return this._label + " played " + (this.state && this.state.label);
    }
}
export class UserPlayer extends Player {
    constructor(label) {
        super(PLAYER_TYPE.USER, label);
    }
    play(n) {
        if (n < PLAY_STATES.length) {
            return this.state = PLAY_STATES[n];
        }
        throw new Error("Invalid play state provided.");
    }
    toString() {
        return "You played " + (this.state && this.state.label);
    }
}
//# sourceMappingURL=GameController.js.map