import {TILE_SIZE} from "../game_state/Play";
import Player from "../Player";
import Point from "../Point";
import {Level} from "../levels/Level";
import Game = Phaser.Game;
import Group = Phaser.Group;
import {SENS} from "../Sens";

export abstract class GameObject {
  protected sprite: Phaser.Sprite;
  protected position: Point;
  protected sens: SENS;

  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Group) {
    this.sprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips', 0, objectGroup);
    this.position = new Point(x, y);
  }

  getPosition(): Point {
    return this.position;
  }

  animatePlayerBegin(game: Game, level: Level, player: Player, endPosition: Point) {
  }

  animateEnd(game: Game, level: Level, actor: GameObject, endPosition: Point) {
  }

  animatePush(game: Game, level: Level, actor: GameObject, endPosition: Point) {
  }

  canActorGoToMe(actor: GameObject, endPosition: PIXI.Point, level: Level): boolean {
    return true;
  }

  destroy() {
    this.sprite.destroy(true);
  }

  update(game: Phaser.Game, level: Level) {
  }

  teleportTo(destination: Point) {
    this.position = destination;
    this.sprite.x = this.position.x * TILE_SIZE;
    this.sprite.y = this.position.y * TILE_SIZE;
  }

  getSens() {
    return this.sens;
  }
}
