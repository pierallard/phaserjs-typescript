import Player from "../Player";
import {Cell} from "./Cell";
import Group = Phaser.Group;
import EmptyCell from "./EmptyCell";
import {Level} from "../levels/Level";
import Point from "../Point";
import Game = Phaser.Game;

export class ExitDoor extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 70;
  }

  canPlayerGoTo(player: Player): boolean {
    return player.canExit();
  }

  animatePlayerBegin(game: Game, level: Level, player: Player, endPosition: Point) {
    this.sprite.frame = EmptyCell.EMPTY_CELL;
  }
}
