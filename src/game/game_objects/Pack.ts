import {TILE_SIZE, TIME} from "../game_state/Play";
import Player from "../Player";
import {Level} from "../levels/Level";
import Point from "../Point";
import {GameObject} from "./GameObject";
import Group = Phaser.Group;
import Game = Phaser.Game;
import {SENS} from "../Sens";

export default class Pack extends GameObject {
  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Group) {
    super(game, x, y, objectGroup);

    this.sprite.frame = 19 + 64;
  }

  animatePlayerBegin(game: Game, level: Level, player: Player, endPosition: Point) {
    this.move(this.position.add(endPosition.remove(player.getPosition())), game, level);
  }

  private move(packNewPosition: Point, game: Game, level: Level) {
    game.add.tween(this.sprite).to({
      x: packNewPosition.x * TILE_SIZE,
      y: packNewPosition.y * TILE_SIZE
    }, TIME, Phaser.Easing.Default, true);
    game.time.events.add(TIME, () => {
      this.sens = this.computeSens(this.position, packNewPosition);
      this.position = packNewPosition;
      level.animateEnd(game, this, this.position);
      this.sprite.x = this.position.x * TILE_SIZE;
      this.sprite.y = this.position.y * TILE_SIZE;
      const forceCell = level.getCellAt(this.position).forceCell(this, level);
      if (forceCell) {
        this.move(forceCell, game, level);
      }
    });
  }

  // TODO This should be in a specific class, used twice.
  private computeSens(begin: Point, end: Point): SENS {
    if (begin.x < end.x) {
      return SENS.RIGHT;
    } else if (begin.x > end.x) {
      return SENS.LEFT;
    } else if (begin.y < end.y) {
      return SENS.DOWN;
    } else {
      return SENS.UP;
    }
  }

  canActorGoToMe(actor: GameObject, endPosition: Point, level: Level): boolean {
    if (actor instanceof Player) {
      // Try to move
      const packNewPosition = this.position.add(endPosition.remove(actor.getPosition()));
      return level.isMoveAllowed(this, this.position, packNewPosition);
    } else {
      return false;
    }
  }
}
