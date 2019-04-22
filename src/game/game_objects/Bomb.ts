import {GameObject} from "./GameObject";
import {Level} from "../levels/Level";
import Point from "../Point";
import Game = Phaser.Game;

export class Bomb extends GameObject {
  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Phaser.Group) {
    super(game, x, y, objectGroup);

    this.sprite.frame = 35;
  }

  isToxic() {
    return true;
  }

  animateEnd(game: Game, level: Level, actor: GameObject, endPosition: Point) {
    level.animateFireAt(game, endPosition);
    this.destroy();
    actor.destroy();
    level.destroyObject(this);
    level.destroyObject(actor);
  }
}