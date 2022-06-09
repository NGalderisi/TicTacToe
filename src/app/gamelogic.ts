import {Status} from './gamestatus';

export class Gamelogic {

    gameField: Array<number> = [];

    currentTurn!: number;

    gameStatus: Status;

    winSituationsOne: Array<Array<number>> = [
        [1,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,1,0,0],
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,0,1],
        [0,0,1,0,1,0,1,0,0]
    ]

    winSituationsTwo: Array<Array<number>> = [
        [2,2,2,0,0,0,0,0,0],
        [0,0,0,2,2,2,0,0,0],
        [0,0,0,0,0,0,2,2,2],
        [2,0,0,2,0,0,2,0,0],
        [0,2,0,0,2,0,0,2,0],
        [0,0,2,0,0,2,0,0,2],
        [2,0,0,0,2,0,0,0,2],
        [0,0,2,0,2,0,2,0,0]
    ]

    public constructor() {
        this.gameStatus = Status.STOP
        this.gameField= [0,0,0,0,0,0,0,0,0]
    }

    gameStart(): void {
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

    arrayEquals(a: Array<any>, b: Array<any>): boolean{
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every ( (value, index) => value === b[index]);

    }

    async checkForWinner(): Promise<boolean> {
        let isWinner = false;

        const checkArray = (this.currentTurn === 1)? this.winSituationsOne :this.winSituationsTwo;

        const currentarray: any[] = [];

        this.gameField.forEach( (subField,index) =>{
            if ( subField !== this.currentTurn) {
                currentarray[index] = 0;
            } else {
                currentarray[index] = subField;
            }
        });

        checkArray.forEach((checkField, checkIndex) =>{
            if(this.arrayEquals(checkField,currentarray)){
                isWinner = true;
                this.gameEnd();
            }
        })
        return isWinner;
    }

    gameEnd(): void {
        this.gameStatus=Status.GAMEOVER;
    }
}
