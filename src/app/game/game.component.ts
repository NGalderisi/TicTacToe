import { Component, OnInit } from '@angular/core';
import {Gamelogic} from "../gamelogic";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor(public game: Gamelogic) { }

  ngOnInit(): void {
  }

  toggleVolume(): void{
    if(this.game.gameSound === 0){ this.game.gameSound = 1}
    else this.game.gameSound = 0;
  }
  homeScreen(): void{
    this.game.gameDifficulty = 0;
    this.game.gameStatus = 0;
  }

  setDifficultyEasy(): void{
    this.game.difficultySetEasy();
  }
  setDifficultyNormal(): void{
    this.game.difficultySetNormal();
  }
  setDifficultyImpossible(): void{
    this.game.difficultySetImpossible();
  }

  startGame(): void{
    this.game.gameStart();
    const currentPlayer = 'Current turn: Player: ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    information!.innerHTML = currentPlayer;
  }

  resetGame(): void{
    this.game.gameReset();
    const currentPlayer = 'Current turn: Player: ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    information!.innerHTML = currentPlayer;
    const boxes = document.querySelectorAll('.reset');
    boxes.forEach(box => {
      box.classList.remove('reset', 'player1','player2',);
    });
  }

  clickSubField( subfield: any ): void {
    const position = subfield.currentTarget.getAttribute('position')
    const subfieldElement = document.getElementById(position);
    const information = document.querySelector('.current-status');
    if(this.game.gameField[position] === 0){
      if (this.game.gameStatus === 1){
        this.game.makeMove(position,information, subfieldElement)
      }

      if (this.game.gameDifficulty === 1 && this.game.gameStatus === 1){
        this.game.Computer(2);
      }
      else if (this.game.gameDifficulty === 2 && this.game.gameStatus === 1){
        this.game.Computer(3);
      }
      else if (this.game.gameDifficulty === 3 && this.game.gameStatus === 1){
        this.game.Computer(7);
      }
    }
  }
}

