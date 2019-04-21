import {Cell} from "./Cell";
import Player from "../Player";
import {Level} from "../levels/Level";
import Point from "../Point";
import Game = Phaser.Game;

export default class TankSwitch extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 39;
  }

  animateEnd(game: Game, player: Player, endPosition: Point, level: Level) {
    level.switchTanks();
  }
}