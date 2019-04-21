import {TILE_SIZE, TIME} from "../game_state/Play";
import Player from "../Player";
import {Level} from "../levels/Level";
import Point from "../Point";
import {WaterCell} from "../cells/WaterCell";
import {GameObject} from "./GameObject";
import Group = Phaser.Group;
import Game = Phaser.Game;

export default class Pack extends GameObject {
  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Group) {
    super(game, x, y, objectGroup);

    this.sprite.frame = 19 + 64;
  }

  act(game: Phaser.Game, player: Player, endPosition: PIXI.Point, level: Level) {
    const newPosition = new Point(
      this.position.x + this.diff(player, endPosition).x,
      this.position.y + this.diff(player, endPosition).y
    );
    game.add.tween(this.sprite).to({
      x: newPosition.x * TILE_SIZE,
      y: newPosition.y * TILE_SIZE
    }, TIME, Phaser.Easing.Default, true);
    game.time.events.add(TIME, () => {
      this.position = newPosition;
      this.animateEnd(player, this.position, level, game);
      this.sprite.x = this.position.x * TILE_SIZE;
      this.sprite.y = this.position.y * TILE_SIZE;
    });
  }

  canPlayerGoTo(player: Player, endPosition: PIXI.Point, level: Level) {
    const newPosition = new Point(
      this.position.x + this.diff(player, endPosition).x,
      this.position.y + this.diff(player, endPosition).y
    );

    return level.canPackGoTo(player, newPosition);
  }

  canPackGoTo(player: Player, endPosition: Point, level: Level) {
    return false;
  }

  animateEnd(player: Player, endPosition: Point, level: Level, game: Game) {
    const cell = level.getCellAt(endPosition);
    if (cell instanceof WaterCell && cell.isWater()) {
      cell.changeAfterPack();
      level.animateWaterAt(game, endPosition);
      this.destroy();
      level.destroyObject(this);
    }
  }

  private diff(player: Player, endPosition: PIXI.Point): PIXI.Point {
    const playerPosition = player.getPosition();
    return new PIXI.Point(
      endPosition.x - playerPosition.x,
      endPosition.y - playerPosition.y
    );
  }
}