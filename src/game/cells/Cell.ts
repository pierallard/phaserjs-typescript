import {TILE_SIZE} from "../game_state/Play";
import Player from "../Player";
import {Level} from "../levels/Level";
import Game = Phaser.Game;
import Point from "../Point";
import Group = Phaser.Group;
import {GameObject} from "../game_objects/GameObject";

export abstract class Cell {
  protected sprite: Phaser.Sprite;
  protected position: Point;

  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    this.position = new Point(x, y);
    this.sprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips', 0, groundGroup);
  }

  getPosition() {
    return this.position;
  }

  canActorGoToMe(actor: GameObject) {
    return true;
  }

  canActorGoOutOfMe(level: Level, actor: GameObject, endPosition: Point) {
    return true;
  }

  animateEnd(game: Game, level: Level, actor: GameObject, endPosition: Point) {
  }

  animatePush(game: Game, level: Level, actor: GameObject, endPosition: Point) {
  }

  animatePlayerBegin(game: Game, level: Level, player: Player, endPosition: Point) {
  }

  forceCell(player: Player, level: Level): Point {
    return null;
  }

  setDestination(destCell: Cell) {
    // TODO Replace by a throw
    console.log('Unable to set a destination for the cell ' + this.position.x + ', ' + this.position.y + ' (' + this.constructor.name + ')');
  }

  activate(game: Game, level: Level) {
    console.log('nope');
  }
}
