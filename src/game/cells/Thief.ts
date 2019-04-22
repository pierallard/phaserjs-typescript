import {Cell} from "./Cell";
import {Level} from "../levels/Level";
import {GameObject} from "../game_objects/GameObject";
import Point from "../Point";
import Game = Phaser.Game;
import Player from "../Player";

export class Thief extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 37;
  }

  animateEnd(game: Game, level: Level, player: GameObject, endPosition: Point) {
    if (player instanceof Player) {
      player.removeAllItems();
    }
  }
}