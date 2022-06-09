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

  startGame(): void{
    this.game.gameStart();
    const currentPlayer = 'Current turn: Player: ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    information!.innerHTML = currentPlayer;
  }

  resetGame(): void{
    this.game.gameStart();
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
      const position = subfield.currentTarget.getAttribute('position')
      const information = document.querySelector('.current-status');

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);
      subfield.currentTarget.classList.add('reset');

      await this.game.checkForWinner().then( (end: boolean) =>{
        if ( this.game.gameStatus === 2 && end ){
          information!.innerHTML = 'The Winner is Player ' + this.game.currentTurn;
        }
      });

      await this.game.checkForFull().then( (end: boolean) =>{
        if ( this.game.gameStatus === 2 && end ){
          information!.innerHTML = 'Draw'
        }
      });

      this.game.changePlayer();

      if(this.game.gameStatus === 1) {
        const currentPlayer = 'Current turn: Player: ' + this.game.currentTurn;
        information!.innerHTML = currentPlayer;
      }
    }
  }

}

