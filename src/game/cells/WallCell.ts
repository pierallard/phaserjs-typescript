import Player from "../Player";
import {Cell} from "./Cell";
import Group = Phaser.Group;

export default class WallCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 14 + 32;
  }

  canPlayerGoTo(player: Player) {
    return false;
  }

  isFree() {
    return false;
  }
}