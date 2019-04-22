import {Cell} from "./Cell";
import {Level} from "../levels/Level";
import {BrownButton} from "./BrownButton";
import Player from "../Player";

export class Glue extends Cell {
  private source: BrownButton;

  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 36;
  }

  canPlayerGoOut(level: Level, player: Player) {
    if (level.getObjectAt(this.source.getPosition())) {
      return true;
    }
    return false;
  }

  setSource(brownButton: BrownButton) {
    this.source = brownButton;
  }
}