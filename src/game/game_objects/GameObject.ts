import {TILE_SIZE} from "../game_state/Play";
import Player from "../Player";
import Point from "../Point";
import {Level} from "../levels/Level";
import Game = Phaser.Game;
import Group = Phaser.Group;

export abstract class GameObject {
  protected sprite: Phaser.Sprite;
  protected position: Point;

  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Group) {
    this.sprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips', 0, objectGroup);
    this.position = new Point(x, y);
  }

  getPosition(): Point {
    return this.position;
  }

  act(game: Phaser.Game, player: Player, endPosition: PIXI.Point, level: Level) {
  }

  canPlayerGoTo(player: Player, endPosition: PIXI.Point, level: Level): boolean {
    return true;
  }

  canPackGoTo(player: Player, endPosition: Point, level: Level) {
    return true;
  }

  animateEnd(player: Player, endPosition: Point, level: Level, game: Game) {
  }

  destroy() {
    this.sprite.destroy(true);
  }

  isToxic(): boolean {
    return false;
  }

  update(game: Phaser.Game, level: Level) {
  }
}
