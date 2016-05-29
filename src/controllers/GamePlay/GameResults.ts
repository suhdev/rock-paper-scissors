//This file includes functions to format game results, i.e. round results, hands play results, and final result. 
import {Player,ComputerPlayer,UserPlayer} from '../../services/GameModels';
import {PLAYER_TYPE} from '../../constants';  
/**
 * Generates the round text to be displayed at the end of each round. 
 * 
 * @param {Player} player1 the first player {ComputerPlayer}
 * @param {Player} player2 the second player either a {ComputerPlayer} in simulated mode or a {UserPlayer} in user play mode. 
 * 
 * @returns string representing the round result text. 
 */
export function formatRoundWinnerText(player1:Player,player2:Player){
    let winner:Player = null,
        sb:string[] = [];
    if (player1 && player1.state && player2 && player2.state){
        if ((player1.state.beats & player2.state.value) > 0){
            winner = player1;
        }else if ((player2.state.beats & player1.state.value) > 0){
            winner = player2; 
        }
        if (winner === null){
            sb.push("Its a draw, "); 
        }else {
            sb.push(winner === player1?(player1.getLabel()+" wins this round."):(player2.is(PLAYER_TYPE.USER)?"You win this round.":(player2.getLabel()+" wins this round.")));
        }
    }
    
    return sb.join("");
}

/**
 * Generates the text of the hands played by each player to be displayed at the end of each round. 
 * 
 * @param {Player} player1 the first player {ComputerPlayer}
 * @param {Player} player2 the second player either a {ComputerPlayer} in simulated mode or a {UserPlayer} in user play mode. 
 * 
 * @returns string representing the hands played by both players.  
 */
export function formatHandsText(player1:Player,player2:Player){
    let sb:string[] = [];
    if (player1 && player2 && player1.state && player2.state){
        sb.push(player2.getLabel()+" played "+player2.state.label); 
        sb.push(" while "+player1.getLabel()+" played "+player1.state.label);  
    }
    return sb.join("");
}

/**
 * Generates the game finish text to be displayed when the game finishes. 
 * 
 * @param {Player} player1 the first player {ComputerPlayer}
 * @param {Player} player2 the second player either a {ComputerPlayer} in simulated mode or a {UserPlayer} in user play mode. 
 * 
 * @returns string representing the game finnish text. 
 */
export function formatGameFinishText(player1:Player,player2:Player){
    let sb:string[] = []; 
    if (player1 && player1.state && player2 && player2.state){
        if (player1.getScore() > player2.getScore()){
            if (player2.is(PLAYER_TYPE.USER)){
                sb.push("Sorry, you lose! Play again, you might get lucky! Although I doubt it.")
            }else {
                sb.push(player1.getLabel()+ " wins the game."); 
            }
        }else if (player1.getScore() === player2.getScore()){
            sb.push("It is a draw. No one wins.");
        }else if (player2.getScore() > player1.getScore()){
            if (player2.is(PLAYER_TYPE.USER)){
                sb.push("Congratulations, you win!"); 
            }else {
                sb.push(player2.getLabel()+ " wins the game."); 
            }
        }
    }
    return sb.join(""); 
}