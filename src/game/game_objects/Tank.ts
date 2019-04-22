import {GameObject} from "./GameObject";
import {SENS} from "../Sens";
import {Level} from "../levels/Level";
import Point from "../Point";
import Game = Phaser.Game;
import {TILE_SIZE, TIME} from "../game_state/Play";

export default class Tank extends GameObject {
  private isMoving: boolean;
  private isSwitching: boolean;

  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Phaser.Group) {
    super(game, x, y, objectGroup);

    this.isMoving = false;
    this.isSwitching = false;
    this.sens = SENS.UP;
    this.setFrame();
  }

  isToxic() {
    return true;
  }

  private setFrame() {
    switch(this.sens) {
      case SENS.UP: this.sprite.frame = 32 * 3 + 20; break;
      case SENS.DOWN: this.sprite.frame = 32 * 4 + 20; break;
    }
  }

  animateEnd(game: Game, level: Level, player: GameObject, endPosition: Point) {
    level.animateFireAt(game, endPosition);
    this.destroy();
  }

  update(game: Phaser.Game, level: Level) {
    if (!this.isMoving) {
      if (this.isSwitching) {
        this.isMoving = true;
        this.setFrame();

        const newPosition = this.sens === SENS.UP ? this.position.up() : this.position.down();
        if (!level.canMonsterGo(this.position, newPosition)) {
          this.isMoving = false;
          this.isSwitching = false;
          return;
        }

        game.add.tween(this.sprite).to({
          x: newPosition.x * TILE_SIZE,
          y: newPosition.y * TILE_SIZE
        }, TIME, Phaser.Easing.Default, true);
        game.time.events.add(TIME, () => {
          this.isMoving = false;
          this.position = newPosition;
          this.sprite.x = this.position.x * TILE_SIZE;
          this.sprite.y = this.position.y * TILE_SIZE;
        }, this);
      }
    }
  }

  switch() {
    this.sens = this.sens === SENS.UP ? SENS.DOWN : SENS.UP;
    this.isSwitching = true;
  }
}