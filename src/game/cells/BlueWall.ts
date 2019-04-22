import WallCell from "./WallCell";
import {Level} from "../levels/Level";
import Player from "../Player";
import Point from "../Point";
import Game = Phaser.Game;

export class BlueWall extends WallCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 20 + 32;
  }

  animatePlayerBegin(game: Game, level: Level, player: Player, endPosition: Point) {
    this.sprite.frame = 14 + 32;
  }
}