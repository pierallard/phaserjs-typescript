import {Cell} from "./Cell";
import Player from "../Player";
import Point from "../Point";
import {Level} from "../levels/Level";
import Game = Phaser.Game;

export default class Switch extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 40;
  }

  animatePlayerEnd(game: Game, level: Level, player: Player, endPosition: Point) {
    level.switchWalls();
  }
}
