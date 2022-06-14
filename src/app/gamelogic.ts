import {Status} from './gamestatus';
import {Difficulty} from './computerdifficulty';

export class Gamelogic {

    gameField: Array<number> = [];

    currentTurn!: number;

    gameStatus: Status;

    gameDifficulty: Difficulty;

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

    setField(position: number, value: number, subfieldElement: any): void {
        this.gameField[position] = value;
        const color = this.getPlayerColorClass();
        subfieldElement!.classList.add(color);
        subfieldElement!.classList.add('reset');
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
        
        this.setField(position, this.currentTurn, subfieldElement);
  
        this.checkForDraw(information)

        this.checkForWinner(information)
  
        this.changePlayer(information);
    }

    easyComputer(): void{
        var computerPosition = 0;
        let holder = true;{
            while (holder == true){
                var position = Math.floor(Math.random() * 9);
                let positions = [0,1,2,3,4,5,6,7,8];
                computerPosition = positions[position];
                if(this.gameField[position] === 0){
                    holder = false;
                }
            }
        }
        this.makeComputerMove(computerPosition)
    }

    impossibleComputer(): void{
        var computerPosition = 0;
        let holder = true;{
            while (holder == true){
                var position = Math.floor(Math.random() * 9);
                let positions = [0,1,2,3,4,5,6,7,8];
                computerPosition = positions[position];
                if(this.gameField[position] === 0){
                    holder = false;
                }
            }
        }
        this.makeComputerMove(computerPosition)
    }

    normalComputer(): void{
        var position = Math.floor(Math.random() * 2);
        if(position === 0){
            console.log('easy')
            this.easyComputer();
        }else if(position === 1){
            console.log('impossible')
            this.impossibleComputer();
        }else console.log('failure')
    }
        

    makeComputerMove(computerPosition:number): void {
        (async () => { 
            await this.delay(500);
            var computerPositionId = computerPosition.toString();
            const computerMove = document.getElementById(computerPositionId)
            const information = document.querySelector('.current-status');
            if(this.gameField[computerPosition] === 0){

                this.setField(computerPosition, this.currentTurn, computerMove);
                
                this.checkForDraw(information)
                
                this.checkForWinner(information)
            
                this.changePlayer(information);
            }
        })();
    }

    checkForDraw(information: any): boolean {
        let isFull = true;

        if (this.gameField.includes(0) ) {
            isFull = false;
        }
        else{
            this.gameEnd();
        }
        if ( this.gameStatus === 2 ){
            information!.innerHTML = 'Draw'
        }

        return isFull;
    }

    checkForWinner(information: any): boolean {
        let isWinner = false;
        const currentArray: any[] = [];

        this.gameField.forEach( (subField,index) =>{
            if ( subField !== this.currentTurn) {
                currentArray[index] = 0;
            } else {
                currentArray[index] = subField;
            }
        });

        this.winSituations.forEach((situation) =>  {
            if(!isWinner &&  
                this.gameField[situation[0]] == this.currentTurn && 
                this.gameField[situation[0]] == this.gameField[situation[1]] && 
                this.gameField[situation[1]] == this.gameField[situation[2]])
                {
                isWinner = true;
                this.gameEnd();
            }
        })

        if(isWinner){
            var player = (this.currentTurn === 1)? 1 : 2;
            if (player == 1) {
                this.playerOneScore++;
            } else { 
                this.playerTwoScore++; }
        }
        if ( this.gameStatus === 2){
            information!.innerHTML = 'The Winner is Player ' + this.currentTurn;
            const winnerScore = document.querySelector('.score' + this.currentTurn);
            if(this.currentTurn == 1){
                winnerScore!.innerHTML = 'Score: ' + this.playerOneScore;
            } else {
                winnerScore!.innerHTML = 'Score: ' + this.playerTwoScore;
            }
        }
        return isWinner;
    }
    
    gameEnd(): void {
        this.gameStatus=Status.GAMEOVER;
    }

    // var MiniMax = /** @class */ (function () {
    //     function MiniMax() {
    //         this.bestMove = 0;
    //         this.MAX_DEPTH = 6;
    //     }
    //     MiniMax.prototype.buildTree = function (board, player, cb) {
    //         this.bestMove = 0;
    //         this.recursiveBuildTree(board, player, 0);
    //         cb(this.bestMove);
    //     };
    //     MiniMax.prototype.recursiveBuildTree = function (board, currPlayer, depth) {
    //         if (depth > this.MAX_DEPTH) {
    //             return 0;
    //         }
    //         // set the other player for the next game state and check for loss
    //         var otherPlayer = currPlayer === pX ? pO : pX;
    //         // check to see if someone has won in the current boardstate
    //         var winner = board.getWinner();
    //         if (winner === currPlayer) {
    //             return 1;
    //         }
    //         else if (winner === otherPlayer) {
    //             return -1;
    //         }
    //         // check for a full board, if so the game is a draw
    //         if (board.isFull()) {
    //             return 0;
    //         }
    //         // now we start to rank moves
    //         var alpha = -1;
    //         var saList = new Array();
    //         var moveList = board.getAvailableMoves();
    //         for (var _i = 0, moveList_1 = moveList; _i < moveList_1.length; _i++) {
    //             var m_1 = moveList_1[_i];
    //             // copy current gamestate
    //             var boardCopy = board.copy();
    //             // make a branch for each possible move
    //             boardCopy.move(currPlayer, m_1);
    //             // pass the new game state into recursion
    //             var subalpha = -this.recursiveBuildTree(boardCopy, otherPlayer, depth + 1);
    //             // if this move is better than alpha increase alpha
    //             if (alpha < subalpha)
    //                 alpha = subalpha;
    //             // push subalpha to the list only if we're looking at a 'real' game state
    //             if (depth === 0)
    //                 saList.push(subalpha);
    //         }
    //         if (depth === 0) {
    //             var posMoves = new Array();
    //             for (var j = 0; j < saList.length; ++j) {
    //                 if (saList[j] === alpha) {
    //                     posMoves.push(moveList[j]);
    //                 }
    //             }
    //             // pick a random best move
    //             this.bestMove = posMoves[Math.floor(Math.random() * posMoves.length)];
    //         }
    //         return alpha;
    //     };
    //     return MiniMax;
    // }());
}
