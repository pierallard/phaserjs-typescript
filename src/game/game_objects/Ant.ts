import {SENS} from "../Sens";
import {TILE_SIZE, TIME} from "../game_state/Play";
import {Level} from "../levels/Level";
import Point from "../Point";
import {GameObject} from "./GameObject";
import Group = Phaser.Group;
import Game = Phaser.Game;

export default class Ant extends GameObject {
  private static ORDER: SENS[] = [SENS.UP, SENS.LEFT, SENS.DOWN, SENS.RIGHT];

  private isMoving: boolean = false;

  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Group) {
    super(game, x, y, objectGroup);
    this.sens = SENS.UP;

    this.sprite.frame = 32*5;
    this.sprite.animations.add(SENS.LEFT, [164, 165, 166, 167], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add(SENS.RIGHT, [196, 197, 198, 199], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add(SENS.UP, [160, 161, 162, 163], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add(SENS.DOWN, [192, 193, 194, 195], Phaser.Timer.SECOND * 4 / TIME, true);
  }

  isToxic() {
    return true;
  }

  animateEnd(game: Game, level: Level, player: GameObject, endPosition: Point) {
    level.animateFireAt(game, endPosition);
    this.destroy();
  }

  update(game: Game, level: Level) {
    if (!this.isMoving) {
      this.isMoving = true;
      let sens = this.sens;
      let newPosition = this.getNewCell(sens);
      this.sens = Ant.ORDER[(Ant.ORDER.indexOf(this.sens) + 1) % Ant.ORDER.length];
      if (!level.isMoveAllowed(this, this.position, newPosition)) {
        sens = Ant.ORDER[(Ant.ORDER.indexOf(sens) + 3) % Ant.ORDER.length];
        newPosition = this.getNewCell(sens);
        this.sens = Ant.ORDER[(Ant.ORDER.indexOf(this.sens) + 3) % Ant.ORDER.length];
        if (!level.isMoveAllowed(this, this.position, newPosition)) {
          sens = Ant.ORDER[(Ant.ORDER.indexOf(sens) + 3) % Ant.ORDER.length];
          newPosition = this.getNewCell(sens);
          this.sens = Ant.ORDER[(Ant.ORDER.indexOf(this.sens) + 3) % Ant.ORDER.length];
          if (!level.isMoveAllowed(this, this.position, newPosition)) {
            sens = Ant.ORDER[(Ant.ORDER.indexOf(sens) + 3) % Ant.ORDER.length];
            newPosition = this.getNewCell(sens);
            this.sens = Ant.ORDER[(Ant.ORDER.indexOf(this.sens) + 3) % Ant.ORDER.length];
            if (!level.isMoveAllowed(this, this.position, newPosition)) {
              newPosition = this.getPosition();
              this.sens = Ant.ORDER[(Ant.ORDER.indexOf(this.sens) + 3) % Ant.ORDER.length];
            }
          }
        }
      }

      this.sprite.animations.play(this.sens + '');

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

  private getNewCell(sens: SENS) {
    switch (sens) {
      case SENS.UP: return this.position.left();
      case SENS.LEFT: return this.position.down();
      case SENS.DOWN: return this.position.right();
      case SENS.RIGHT: return this.position.up();
    }
  }

  canActorGoToMe(actor: GameObject, endPosition: PIXI.Point, level: Level): boolean {
    return !(actor instanceof Ant);
  }
}
