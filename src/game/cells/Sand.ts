import {Cell} from "./Cell";
import {Level} from "../levels/Level";
import {GameObject} from "../game_objects/GameObject";
import Point from "../Point";
import Player from "../Player";

export class Sand extends Cell {
  private dirty: boolean;

  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 23;
    this.dirty = true;
  }

  animateEnd(game: Phaser.Game, level: Level, actor: GameObject, endPosition: Point) {
    this.dirty = false;
    this.sprite.frame = 0;
  }

  canActorGoToMe(actor: GameObject): boolean {
    if (actor instanceof Player) {
      return true;
    }

    return !this.dirty;
  }
}
