import {Cell} from "./Cell";
import {Level} from "../levels/Level";
import Player from "../Player";
import Point from "../Point";
import Game = Phaser.Game;

export default class RedButton extends Cell {
  private destination: Cell;

  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 41;
  }

  setDestination(destCell: Cell) {
    this.destination = destCell;
  }

  animatePlayerEnd(game: Game, level: Level, player: Player, endPosition: Point) {
    this.destination.runAction(game, level);
  }
}