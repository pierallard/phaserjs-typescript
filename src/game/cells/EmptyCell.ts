import {Cell} from "./Cell";
import Group = Phaser.Group;

export default class EmptyCell extends Cell {
  static EMPTY_CELL = 0;

  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = EmptyCell.EMPTY_CELL;
  }
}