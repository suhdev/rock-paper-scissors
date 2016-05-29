//StrikeJS is a library that I've built to write ReactJS applications. 
//It is in a way an OO version of Redux, with some nice features including 
//Dependency injection module, service middlewares, and integer based action types. 
import { ComputerPlayer, UserPlayer } from '../../services/GameModels';
import { GAME_MODES } from '../../constants';
export const STATE_KEY = 'game';
export const GamePlayInitialState = {
    visible: false,
    player1: new ComputerPlayer("Computer"),
    player2: new UserPlayer("You"),
    gameWinner: null,
    roundWinner: null,
    maxRounds: 3,
    round: 0,
    roundCardVisible: false,
    finishCardVisible: false,
    gameMode: GAME_MODES.PLAYER_VS_COMPUTER,
    playing: false,
};
//# sourceMappingURL=StateAndProps.js.map