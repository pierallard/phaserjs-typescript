import {Cell} from "./Cell";
import {TIME} from "../game_state/Play";
import {GameObject} from "../game_objects/GameObject";

export default class SwitchWall extends Cell {
  private locked: boolean;

  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group, locked: boolean) {
    super(game, x, y, groundGroup);
    this.locked = locked;

    this.sprite.animations.add('UNLOCKED', [53, 54, 55, 56], Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.add('LOCKED', [57, 58, 59, 60], Phaser.Timer.SECOND * 3 / TIME, true);
    this.runAnimation();
  }

  canPlayerGoTo(player: GameObject) {
    return !this.locked;
  }

  isFreeForMonster() {
    return !this.locked;
  }

  switch() {
    this.locked = !this.locked;
    this.runAnimation();
  }

  private runAnimation() {
    if (this.locked) {
      this.sprite.animations.play('LOCKED');
    } else {
      this.sprite.animations.play('UNLOCKED');
    }
  }
}
