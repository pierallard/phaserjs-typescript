import WallCell from "./WallCell";
import {Level} from "../levels/Level";
import Point from "../Point";
import Game = Phaser.Game;
import {GameObject} from "../game_objects/GameObject";

export class InvisibleWall extends WallCell {
  private visibleAfterHit: boolean;

  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group, visibleAfterHit: boolean) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 0;
    this.visibleAfterHit = visibleAfterHit;
  }

  animateEnd(game: Game, level: Level, player: GameObject, endPosition: Point) {
    if (this.visibleAfterHit) {
      this.sprite.frame = 14 + 32;
    }
  }
}