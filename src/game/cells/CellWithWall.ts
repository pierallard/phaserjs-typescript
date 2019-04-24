import Group = Phaser.Group;
import {GameObject} from "../game_objects/GameObject";
import {Level} from "../levels/Level";
import Point from "../Point";
import {Cell} from "./Cell";

export class CellWithWallUp extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 47;
  }

  canActorGoOutOfMe(level: Level, actor: GameObject, endPosition: Point): boolean {
    return !actor.getPosition().up().equals(endPosition);
  }
}

export class CellWithWallLeft extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 48;
  }

  canActorGoOutOfMe(level: Level, actor: GameObject, endPosition: Point): boolean {
    return !actor.getPosition().left().equals(endPosition);
  }
}

export class CellWithWallDown extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 49;
  }

  canActorGoOutOfMe(level: Level, actor: GameObject, endPosition: Point): boolean {
    return !actor.getPosition().down().equals(endPosition);
  }
}

export class CellWithWallRight extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 50;
  }

  canActorGoOutOfMe(level: Level, actor: GameObject, endPosition: Point): boolean {
    return !actor.getPosition().right().equals(endPosition);
  }
}

