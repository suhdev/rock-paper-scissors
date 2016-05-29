import {Player} from '../../services/GameController';
import {PLAYER_TYPE} from '../../constants';  
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

export function formatHandsText(player1:Player,player2:Player){
    let sb:string[] = [];
    if (player1 && player2 && player1.state && player2.state){
        sb.push(player2.getLabel()+" played "+player2.state.label); 
        sb.push(" while "+player1.getLabel()+" played "+player1.state.label);  
    }
    return sb.join("");
}

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