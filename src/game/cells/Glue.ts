import {Cell} from "./Cell";

export class Glue extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 36;
  }

  canPlayerGoOut() {
    return false;
  }
}