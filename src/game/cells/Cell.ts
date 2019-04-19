import {TILE_SIZE} from "../game_state/Play";
import Player from "../Player";
import {Level} from "../levels/Level";
import Game = Phaser.Game;
import Point from "../Point";
import Group = Phaser.Group;

export abstract class Cell {
  protected sprite: Phaser.Sprite;
  protected position: Point;

  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    this.position = new Point(x, y);
    this.sprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips', 0, groundGroup);
  }

  canPlayerGoTo(player: Player) {
    return true;
  }

  animateEnd(game: Game, player: Player, endPosition: Point, level: Level) {
  }

  isDead(player: Player) {
    return false;
  }

  animateBegin(player: Player) {
  }

  canPackGoTo(player: Player) {
    return this.canPlayerGoTo(player);
  }

  isFree(): boolean {
    return true;
  }

  forceCell(player: Player): Point {
    return null;
  }
}
