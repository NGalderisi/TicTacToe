import {Status} from './gamestatus';

export class Gamelogic {

    gameField: Array<number> = [];

    currentTurn!: number;

    gameStatus: Status;

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
        this.gameStatus = Status.STOP
        this.gameField= [0,0,0,0,0,0,0,0,0]
    }

    gameStart(): void {
        this.gameField= [0,0,0,0,0,0,0,0,0]
        this.currentTurn = this.randomPlayerStart();
        this.playerOneScore = 0;
        this.playerTwoScore = 0;
        this.gameStatus= Status.START;
    }

    gameReset(): void {
        this.gameField= [0,0,0,0,0,0,0,0,0]
        this.currentTurn = this.randomPlayerStart();
        this.gameStatus= Status.START;
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
