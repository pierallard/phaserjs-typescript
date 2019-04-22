import {Cell} from "./Cell";
import Player from "../Player";
import {Level} from "../levels/Level";
import Point from "../Point";
import Game = Phaser.Game;
import {GameObject} from "../game_objects/GameObject";

export default class TankSwitch extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 39;
  }

  animateEnd(game: Game, level: Level, player: GameObject, endPosition: Point) {
    level.switchTanks();
  }
}