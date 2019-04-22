import {Cell} from "./Cell";
import {Level} from "../levels/Level";
import {GameObject} from "../game_objects/GameObject";
import Point from "../Point";
import Game = Phaser.Game;
import Player from "../Player";

export class BuildingWall extends Cell {
  private isBuilt: boolean;

  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 64;
    this.isBuilt = false;
  }

  animateEnd(game: Game, level: Level, actor: GameObject, endPosition: Point) {
    this.sprite.frame = 46;
    this.isBuilt = true;
  }

  canPlayerGoTo(player: Player) {
    return !this.isBuilt;
  }

  isFreeForMonster() {
    return !this.isBuilt;
  }
}