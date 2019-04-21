import {GameObject} from "./GameObject";
import {SENS} from "../Sens";
import {Level} from "../levels/Level";
import {default as Play, TILE_SIZE, TIME} from "../game_state/Play";
import Player from "../Player";
import Point from "../Point";
import Game = Phaser.Game;

export default class FireBall extends GameObject {
  private sens: SENS;
  private isMoving: boolean;

  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Phaser.Group, sens: SENS) {
    super(game, x, y, objectGroup);

    this.sens = sens;
    this.isMoving = false;

    this.sprite.animations.add('DEFAULT', [176, 177, 178, 179], Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }

  isToxic() {
    return true;
  }

  animateEnd(game: Game, level: Level, player: Player|GameObject, endPosition: Point) {
    if (player instanceof Player) {
      level.animateFireAt(game, endPosition);
      this.destroy();
    }
  }

  update(game: Phaser.Game, level: Level) {
    if (!this.isMoving) {
      this.isMoving = true;
      const newPosition = this.position.addSens(this.sens);
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
}