import {TILE_SIZE, TIME} from "../game_state/Play";
import Player from "../Player";
import {Level} from "../levels/Level";
import Point from "../Point";
import {GameObject} from "./GameObject";
import Group = Phaser.Group;
import Game = Phaser.Game;

export default class Pack extends GameObject {
  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Group) {
    super(game, x, y, objectGroup);

    this.sprite.frame = 19 + 64;
  }

  animatePlayerBegin(game: Game, level: Level, player: Player, endPosition: Point) {
    const packNewPosition = this.position.add(endPosition.remove(player.getPosition()));
    game.add.tween(this.sprite).to({
      x: packNewPosition.x * TILE_SIZE,
      y: packNewPosition.y * TILE_SIZE
    }, TIME, Phaser.Easing.Default, true);
    game.time.events.add(TIME, () => {
      this.position = packNewPosition;
      level.animateEnd(game, this, this.position);
      this.sprite.x = this.position.x * TILE_SIZE;
      this.sprite.y = this.position.y * TILE_SIZE;
    });
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

  // animateEnd(game: Game, level: Level, player: GameObject, endPosition: Point) {
  //   const cell = level.getCellAt(endPosition);
  //   if (cell instanceof WaterCell && cell.isWater()) {
  //     cell.changeAfterPack();
  //     level.animateWaterAt(game, endPosition);
  //     this.destroy();
  //     level.destroyObject(this);
  //   }
  // }
}
