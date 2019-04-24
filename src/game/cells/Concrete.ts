import {Cell} from "./Cell";
import {GameObject} from "../game_objects/GameObject";

export class Concrete extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 22;
  }

  canActorGoToMe(player: GameObject): boolean {
    return false;
  }
}
