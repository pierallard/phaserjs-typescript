import {GameObject} from "./GameObject";
import {Level} from "../levels/Level";
import Game = Phaser.Game;
import {TILE_SIZE, TIME} from "../game_state/Play";
import Point from "../Point";

export class Mouth extends GameObject {
  private isMoving: boolean;

  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Phaser.Group) {
    super(game, x, y, objectGroup);

    this.isMoving = false;
    this.sprite.frame = 203;
    this.sprite.animations.add('DEFAULT', [200, 201, 202, 203]);
  }

  isToxic(): boolean {
    return true;
  }

  update(game: Game, level: Level) {
    const speed = TIME * 2;
    if (!this.isMoving) {
      const newPosition = this.getNewPosition(level);
      if (this.position.equals(newPosition)) {
        this.sprite.animations.stop('DEFAULT');
        this.sprite.frame = 203;
        return;
      }

      this.isMoving = true;

      this.sprite.animations.play('DEFAULT', Phaser.Timer.SECOND * 4 / TIME, true);
      game.add.tween(this.sprite).to({
        x: newPosition.x * TILE_SIZE,
        y: newPosition.y * TILE_SIZE
      }, speed, Phaser.Easing.Default, true);
      game.time.events.add(speed, () => {
        this.isMoving = false;
        this.position = newPosition;
        level.animateEnd(game, this, this.position);
        this.sprite.x = this.position.x * TILE_SIZE;
        this.sprite.y = this.position.y * TILE_SIZE;
      }, this);
    }
  }

  private getNewPosition(level: Level): Point {
    const possiblePositions = [
      this.position,
      this.position.left(),
      this.position.up(),
      this.position.down(),
      this.position.right()
    ];
    const availablePositions = possiblePositions.filter((position) => {
      return level.isMoveAllowed(this, this.position, position);
    });
    const sortedPositions = availablePositions.sort((pos1: Point, pos2: Point) => {
      return Mouth.getDist(level.getPlayer().getPosition(), pos1) - Mouth.getDist(level.getPlayer().getPosition(), pos2);
    });
    return sortedPositions[0];
  }

  private static getDist(position: Point, position2: Point) {
    return Math.sqrt(
      (position.x - position2.x) * (position.x - position2.x) +
      (position.y - position2.y) * (position.y - position2.y)
    );
  }
}
