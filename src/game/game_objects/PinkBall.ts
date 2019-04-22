import {GameObject} from "./GameObject";
import {TILE_SIZE, TIME} from "../game_state/Play";
import {Level} from "../levels/Level";
import {SENS} from "../Sens";

export default class PinkBall extends GameObject {
  private isMoving: boolean;
  private sens: SENS;

  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Phaser.Group) {
    super(game, x, y, objectGroup);

    this.sprite.animations.add('DEFAULT', [204, 205, 206, 205]);
    this.sprite.animations.play('DEFAULT', Phaser.Timer.SECOND * 4 / TIME, true, false);
    this.isMoving = false;
    this.sens = SENS.RIGHT;
  }

  update(game: Phaser.Game, level: Level) {
    if (!this.isMoving) {
      this.isMoving = true;
      let newPosition = this.position.addSens(this.sens);
      if (!level.canMonsterGo(this.position, newPosition)) {
        this.sens = this.revertSens();
        newPosition = this.position.addSens(this.sens);
        if (!level.canMonsterGo(this.position, newPosition)) {
          this.sens = this.revertSens();
          newPosition = this.position;
        }
      }
      game.add.tween(this.sprite).to({
        x: newPosition.x * TILE_SIZE,
        y: newPosition.y * TILE_SIZE
      }, TIME, Phaser.Easing.Default, true);
      game.time.events.add(TIME, () => {
        this.isMoving = false;
        this.position = newPosition;
        level.animateEnd(game, this, this.position);
        this.sprite.x = this.position.x * TILE_SIZE;
        this.sprite.y = this.position.y * TILE_SIZE;
      }, this);
    }
  }

  private revertSens() {
    switch (this.sens) {
      case SENS.LEFT: return SENS.RIGHT;
      case SENS.RIGHT: return SENS.LEFT;
      case SENS.UP: return SENS.DOWN;
      case SENS.DOWN: return SENS.UP;
    }
  }
}