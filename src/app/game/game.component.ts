import { Component, OnInit } from '@angular/core';
enum Player {
  None = '',
  X = 'X',
  O = '0',
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  cells: Player[] = new Array(9).fill(Player.None);
  currentPlayer: Player = Player.X;
  winner: Player | null = null;
  gameOver: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  makeMove(index: number) {
    if (!this.cells[index] && !this.gameOver) {
      this.cells[index] = this.currentPlayer;
      this.checkWinner();
      this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X
    }

    if (this.winner) {
      alert(`Player ${this.winner} wins!`);
      setTimeout(() => {
        this.reset();
      }, 3000)
    } else if (this.gameOver) {
      alert(`It\'s a draw!`);
    }
  }

  checkWinner() {
    const winnerPosition: number[][] = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of winnerPosition) {
      if (this.cells[a] != Player.None &&
        this.cells[a] === this.cells[b] &&
        this.cells[a] === this.cells[c]
      ) {
        this.winner = this.cells[a];
        this.gameOver = true;
      }
    }
  }

  reset() {
    this.cells.fill(Player.None);
    this.currentPlayer = Player.X;
    this.winner = null;
    this.gameOver = false;
  }
}