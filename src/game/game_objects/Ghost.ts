import {GameObject} from "./GameObject";
import {TILE_SIZE, TIME} from "../game_state/Play";
import {Level} from "../levels/Level";
import Game = Phaser.Game;
import {SENS} from "../Sens";

export class Ghost extends GameObject {
  private static ORDER: SENS[] = [SENS.UP, SENS.LEFT, SENS.DOWN, SENS.RIGHT];
  
  private isMoving: boolean;
  private sens: SENS;

  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Phaser.Group) {
    super(game, x, y, objectGroup);

    this.sprite.frame = 32 * 3 + 22;
    this.isMoving = false;
    this.sens = SENS.UP;
  }

  update(game: Game, level: Level) {
    if (!this.isMoving) {
      this.isMoving = true;
      let newPosition = this.position.addSens(this.sens);
      if (!level.canMonsterGo(this.position, newPosition)) {
        this.sens = Ghost.ORDER[(Ghost.ORDER.indexOf(this.sens) + 1) % Ghost.ORDER.length];
        newPosition = this.position.addSens(this.sens);
        if (!level.canMonsterGo(this.position, newPosition)) {
          this.sens = Ghost.ORDER[(Ghost.ORDER.indexOf(this.sens) + 1) % Ghost.ORDER.length];
          newPosition = this.position.addSens(this.sens);
          if (!level.canMonsterGo(this.position, newPosition)) {
            this.sens = Ghost.ORDER[(Ghost.ORDER.indexOf(this.sens) + 1) % Ghost.ORDER.length];
            newPosition = this.position.addSens(this.sens);
            if (!level.canMonsterGo(this.position, newPosition)) {
              this.sens = Ghost.ORDER[(Ghost.ORDER.indexOf(this.sens) + 1) % Ghost.ORDER.length];
              this.isMoving = false;
              return;
            }
          }
        }
      }

      switch (this.sens) {
        case SENS.UP: this.sprite.frame = 32 * 3 + 22; break;
        case SENS.LEFT: this.sprite.frame = 32 * 3 + 23; break;
        case SENS.DOWN: this.sprite.frame = 32 * 4 + 22; break;
        case SENS.RIGHT: this.sprite.frame = 32 * 4 + 23; break;
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

  isToxic() {
    return true;
  }
}