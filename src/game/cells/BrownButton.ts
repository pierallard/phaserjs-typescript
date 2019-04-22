import {Cell} from "./Cell";
import {Glue} from "./Glue";

export class BrownButton extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 42;
  }

  setDestination(destCell: Cell) {
    if (destCell instanceof Glue) {
      destCell.setSource(this);

      return;
    }

    throw 'Unable to set this source for BrownButton'
  }
}