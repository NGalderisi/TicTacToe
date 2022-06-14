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

  async clickSubField( subfield: any ): Promise<void> {
    if (this.game.gameStatus === 1){
     this.game.makeMove(subfield)
    }
    
    if (this.game.gameDifficulty === 1 && this.game.gameStatus === 1){
      this.game.easyComputer();
    }
    if (this.game.gameDifficulty === 2 && this.game.gameStatus === 1){
      this.game.normalComputer();
    }
    if (this.game.gameDifficulty === 3 && this.game.gameStatus === 1){
      this.game.impossibleComputer();
    }
  }

}

