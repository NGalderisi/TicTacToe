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

    setField(position: number, value: number): void {
        this.gameField[position] = value;
    }

    getPlayerColorClass(): string {
        const colorClass = (this.currentTurn === 2)? 'player2' : "player1";
        return colorClass;
    }

    changePlayer(): void {
        this.currentTurn = (this.currentTurn === 2)? 1 : 2;
    }

    async makeMove(subfield: any,): Promise<void> {
        const position = subfield.currentTarget.getAttribute('position')
        const information = document.querySelector('.current-status');
      if(this.gameField[position] === 0){
  
        this.setField(position, this.currentTurn);
        const color = this.getPlayerColorClass();
        subfield.currentTarget.classList.add(color);
        subfield.currentTarget.classList.add('reset');
  
        await this.checkForFull().then( (end: boolean) =>{
          if ( this.gameStatus === 2 && end ){
            information!.innerHTML = 'Draw'
          }
        });
  
        await this.checkForWinner().then( (end: boolean) =>{
          if ( this.gameStatus === 2 && end ){
            information!.innerHTML = 'The Winner is Player ' + this.currentTurn;
            const winnerScore = document.querySelector('.score' + this.currentTurn);
            if(this.currentTurn == 1){
              winnerScore!.innerHTML = 'Score: ' + this.playerOneScore;
            } else {
              winnerScore!.innerHTML = 'Score: ' + this.playerTwoScore;
            }
            
          }
        });
  
        this.changePlayer();
  
        if(this.gameStatus === 1) {
          const currentPlayer = 'Current turn: Player: ' + this.currentTurn;
          information!.innerHTML = currentPlayer;
        }
      }
  
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

    async makeComputerMove(computerPosition:any): Promise<void> {
        await this.delay(500);
        var computerPositionId = computerPosition.toString();
        const computerMove = document.getElementById(computerPositionId)
        const information = document.querySelector('.current-status');
        if(this.gameField[computerPosition] === 0){

            this.setField(computerPosition, this.currentTurn);
            const color = this.getPlayerColorClass();
            computerMove!.classList.add(color);
            computerMove!.classList.add('reset');
            
            await this.checkForFull().then( (end: boolean) =>{
                if ( this.gameStatus === 2 && end ){
                    information!.innerHTML = 'Draw'
                }
            });
        
            await this.checkForWinner().then( (end: boolean) =>{
                if ( this.gameStatus === 2 && end ){
                    information!.innerHTML = 'The Winner is Player ' + this.currentTurn;
                    const winnerScore = document.querySelector('.score' + this.currentTurn);
                    if(this.currentTurn == 1){
                        winnerScore!.innerHTML = 'Score: ' + this.playerOneScore;
                    } else {
                        winnerScore!.innerHTML = 'Score: ' + this.playerTwoScore;
                    }
                }
            });
        
            this.changePlayer();
        
            if(this.gameStatus === 1) {
            const currentPlayer = 'Current turn: Player: ' + this.currentTurn;
            information!.innerHTML = currentPlayer;
            }
        }
    }

    async checkForFull(): Promise<boolean> {
        let isFull = true;

        if (this.gameField.includes(0) ) {
            isFull = false;
        }
        else{
            this.gameEnd();
        }

        return isFull;
    }

    async checkForWinner(): Promise<boolean> {
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
        return isWinner;
    }
    
    gameEnd(): void {
        this.gameStatus=Status.GAMEOVER;
    }
}
