import {Cell} from "./Cell";

export class Concrete extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 22;
  }

  isFreeForMonster(): boolean {
    return false;
  }
}
