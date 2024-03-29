import {Status} from './gamestatus';
import {Difficulty} from './computerdifficulty';
import {Sound} from './sound-toggle';

export class Gamelogic {

    gameField: Array<number> = [];

    currentTurn!: number;

    gameStatus: Status;

    gameDifficulty: Difficulty;

    gameSound: Sound;

    playerOneScore!: number;

    playerTwoScore!: number;

    winSituations: Array<Array<number>> = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    public constructor() {
        this.gameDifficulty = Difficulty.NOCOMPUTER;
        this.gameStatus = Status.STOP
        this.gameSound = Sound.On
        this.gameField= [0,0,0,0,0,0,0,0,0]
    }

    difficultySetEasy(): void {
        this.gameDifficulty = Difficulty.EASY;
    }
    difficultySetNormal(): void {
        this.gameDifficulty = Difficulty.NORMAL;
    }
    difficultySetImpossible(): void {
        this.gameDifficulty = Difficulty.IMPOSSIBLE;
    }
    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    gameStart(): void {
        this.gameField= [0,0,0,0,0,0,0,0,0]
        this.playerOneScore = 0;
        this.playerTwoScore = 0;
        this.gameStatus= Status.START;
        if (this.gameDifficulty === Difficulty.NOCOMPUTER)
        {
            this.currentTurn = this.randomPlayerStart();
        } else this.currentTurn = 1;
    }

    gameReset(): void {
        this.gameField= [0,0,0,0,0,0,0,0,0]
        this.gameStatus= Status.START;
        if (this.gameDifficulty === Difficulty.NOCOMPUTER)
        {
            this.currentTurn = this.randomPlayerStart();
        } else this.currentTurn = 1;
    }

    randomPlayerStart(): number {
        const startPlayer = Math.floor(Math.random()*2) + 1;
        return startPlayer;
    }

    setField(position: number, player: number, subfieldElement: any): void {
        this.gameField[position] = player;
        const color = this.getPlayerColorClass();
        subfieldElement!.classList.add(color);
        subfieldElement!.classList.add('reset');
    }

    setClonedField(position: number, value: number, clonedGameField: any, ): void {
        clonedGameField[position] = value;
    }

    getPlayerColorClass(): string {
        const colorClass = (this.currentTurn === 2)? 'player2' : "player1";
        return colorClass;
    }

    changePlayer(information: any,): void {
        this.currentTurn = (this.currentTurn === 2)? 1 : 2;
        if(this.gameStatus === 1) {
            const currentPlayer = 'Current turn: Player: ' + this.currentTurn;
            information!.innerHTML = currentPlayer;
        }
    }

    makeMove(position: any, information: any, subfieldElement: any): void {
        if (this.currentTurn === 1){
            this.playSound("../assets/place_sound_effect.wav")
        } else{
            this.playSound("../assets/place_sound_effect_2.wav")
        }
        
        this.setField(position, this.currentTurn, subfieldElement);
  
        let winner = this.checkForWinner(this.gameField, this.currentTurn)

        this.updateHtmlForWinner(winner, information)

        let draw = this.checkForDraw(this.gameField, winner)

        this.updateHtmlForDraw(draw,information)
        
        this.changePlayer(information)
    }

    findAvailablePositions(checkGameField: any): Array<number>{
        let availablePositions = [];
        for (var i = 0;i < 9; i++){
            if ( checkGameField[i] === 0){
                availablePositions.push(i);
            }
        }
        return availablePositions
    }

    Computer(maxDepth: any): void{
        let availablePositions = this.findAvailablePositions(this.gameField);
        let bestScore = -Infinity;
        let bestMove!: number;
        let scoreOneMoves: Array<number> = [];
        let scoreZeroMoves: Array<number> = [];
        let scoreNegativeOneMoves: Array<number> = [];
        for (var i = 0; i < availablePositions.length; i++){
            var minimaxGameField  =  Object.assign([], this,this.gameField);
            this.setClonedField(availablePositions[i],this.currentTurn, minimaxGameField)
            let score = this.minimax(minimaxGameField, 0, maxDepth, -Infinity, Infinity, false, this.currentTurn);
            if(score > bestScore){
                bestScore = score;
            }
            if (score == 1){ scoreOneMoves.push(availablePositions[i])
            } else if (score == 0){ scoreZeroMoves.push(availablePositions[i])
            } else if (score == -1){ scoreNegativeOneMoves.push(availablePositions[i])}

            this.setClonedField(availablePositions[i],0, minimaxGameField)
        }
        if (scoreOneMoves.length != 0){
            bestMove = scoreOneMoves[Math.floor(Math.random() * scoreOneMoves.length)];
        } else if (scoreZeroMoves.length != 0){
            bestMove = scoreZeroMoves[Math.floor(Math.random() * scoreZeroMoves.length)];
        } else if (scoreNegativeOneMoves.length != 0){
            bestMove = scoreNegativeOneMoves[Math.floor(Math.random() * scoreNegativeOneMoves.length)];
        }
        this.gameStatus = Status.START
        this.makeComputerMove(bestMove)
    }

    minimax(minimaxGameField: any, depth: number, maxDepth: number, alpha: number, beta: number, isMaxamizing: any, currentTurn: any): any{
        let winner = this.checkForWinner(minimaxGameField, currentTurn)
        let draw = this.checkForDraw(minimaxGameField,winner)
        if(winner === 1){
            return -1;
        } else if(winner === 2){
            return 1;
        }else if(draw){
            return 0;
        }
        if (depth % 2 == 0){
            currentTurn = 1
        } else {currentTurn = 2}
        if (depth === maxDepth){
            return 0;
        }
        if (isMaxamizing){
            let bestScore = -Infinity;
            let availablePositions = this.findAvailablePositions(minimaxGameField);
            for (var i = 0; i < availablePositions.length; i++){
                this.setClonedField(availablePositions[i],currentTurn,minimaxGameField)
                let score = this.minimax(minimaxGameField, depth + 1, maxDepth, alpha, beta, false, currentTurn);
                bestScore = Math.max(score,bestScore)
                alpha = Math.max(alpha, score)
                this.setClonedField(availablePositions[i],0,minimaxGameField)
                if (beta <= alpha){
                    break}
            }
            return bestScore
        } else {
            let bestScore = Infinity;
            let availablePositions = this.findAvailablePositions(minimaxGameField);
            for (var i = 0; i < availablePositions.length; i++){
                this.setClonedField(availablePositions[i],currentTurn,minimaxGameField)
                let score = this.minimax(minimaxGameField, depth + 1, maxDepth, alpha, beta, true, currentTurn);
                bestScore =  Math.min(score,bestScore);
                beta = Math.min(beta, score)
                this.setClonedField(availablePositions[i],0,minimaxGameField)
                if (beta <= alpha){
                    break}
            }
            return bestScore
        }
        
    }
        
    makeComputerMove(computerPosition:number): void {
        (async () => { 
            await this.delay(500);
            this.playSound("../assets/place_sound_effect_2.wav")
            var computerPositionId = computerPosition.toString();
            const computerMove = document.getElementById(computerPositionId)
            const information = document.querySelector('.current-status');
            if(this.gameField[computerPosition] === 0){

                this.setField(computerPosition, this.currentTurn, computerMove);
                
                let winner = this.checkForWinner(this.gameField, this.currentTurn)

                this.updateHtmlForWinner(winner, information);

                let draw = this.checkForDraw(this.gameField, winner)

                this.updateHtmlForDraw(draw,information)
            
                this.changePlayer(information)
            }
        })();
    }

    checkForDraw(checkGameField: any, winner: number): boolean {
        if(winner === 0){
            let isDraw = true;

            if (checkGameField.includes(0) ) {
                isDraw = false;
            }
            else{
                this.gameEnd();
            }

            return isDraw;
        } else return false
    }

    updateHtmlForDraw(isDraw: boolean, information: any): void {
        if ( this.gameStatus === 2 && isDraw){
            information!.innerHTML = 'Draw'
        }
    }

    checkForWinner(checkGameField: any, currentTurn: any): number {
        let winner = 0;

        this.winSituations.forEach((situation) =>  {
            if(!winner &&  
                checkGameField[situation[0]] == currentTurn && 
                checkGameField[situation[0]] == checkGameField[situation[1]] && 
                checkGameField[situation[1]] == checkGameField[situation[2]])
                {
                winner = currentTurn;
                this.gameEnd();
            }
        })
        return winner;
    }

    updateHtmlForWinner(winner: number, information: any): void {
        if( this.gameStatus === 2 && winner !== 0){
            //var player = (this.currentTurn === 1)? 1 : 2;
            if (winner == 1) {
                this.playerOneScore++;
            } else { 
                this.playerTwoScore++; 
            }
            
            information!.innerHTML = 'The Winner is Player ' + winner;
            const winnerScore = document.querySelector('.score' + winner);
            if(winner == 1){
                winnerScore!.innerHTML = 'Score: ' + this.playerOneScore;
            } else {
                winnerScore!.innerHTML = 'Score: ' + this.playerTwoScore;
            }
            this.playSound("../assets/win_sound_effect.wav")
        }
    }

    playSound(fileLocation : any) {
        if (this.gameSound === 0){
            let winSound = new Audio()
            winSound.src = fileLocation
            winSound.load()
            winSound.play()
        }
    }
    
    gameEnd(): void {
        this.gameStatus=Status.GAMEOVER;
    }
}
