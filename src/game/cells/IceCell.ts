import {SENS} from "../Sens";
import Player from "../Player";
import Point from "../Point";
import {Cell} from "./Cell";
import Group = Phaser.Group;
import {IceBoots} from "../game_objects/PickableObject";
import {Level} from "../levels/Level";

export default class IceCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 17;
  }

  protected subForceCell(player: Player): Point {
    if (player.has(IceBoots)) {
      return null;
    }
    switch (player.getSens()) {
      case SENS.UP: return this.position.up();
      case SENS.DOWN: return this.position.down();
      case SENS.LEFT: return this.position.left();
      case SENS.RIGHT: return this.position.right();
    }
  }

  forceCell(player: Player, level: Level) {
    const forceCell = this.subForceCell(player);
    if (forceCell !== null && !level.isMoveAllowed(player, player.getPosition(), forceCell)) {
      return player.getPosition().addReverseSens(player.getSens());
    }

    return forceCell;
  }
}

export class IceCellBottomLeft extends IceCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 19;
  }

  protected subForceCell(player: Player): Point {
    if (player.has(IceBoots)) {
      return null;
    }
    switch (player.getSens()) {
      case SENS.UP: return this.position.down();
      case SENS.DOWN: return this.position.right();
      case SENS.LEFT: return this.position.up();
      case SENS.RIGHT: return this.position.left();
    }
  }
}

export class IceCellTopLeft extends IceCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 21;
  }

  protected subForceCell(player: Player): Point {
    if (player.has(IceBoots)) {
      return null;
    }
    switch (player.getSens()) {
      case SENS.UP: return this.position.right();
      case SENS.DOWN: return this.position.up();
      case SENS.LEFT: return this.position.down();
      case SENS.RIGHT: return this.position.left();
    }
  }
}

export class IceCellBottomRight extends IceCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 18;
  }

  protected subForceCell(player: Player): Point {
    if (player.has(IceBoots)) {
      return null;
    }
    switch (player.getSens()) {
      case SENS.UP: return this.position.down();
      case SENS.DOWN: return this.position.left();
      case SENS.LEFT: return this.position.right();
      case SENS.RIGHT: return this.position.up();
    }
  }
}

export class IceCellTopRight extends IceCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 20;
  }

  protected subForceCell(player: Player): Point {
    if (player.has(IceBoots)) {
      return null;
    }
    switch (player.getSens()) {
      case SENS.UP: return this.position.left();
      case SENS.DOWN: return this.position.up();
      case SENS.LEFT: return this.position.right();
      case SENS.RIGHT: return this.position.down();
    }
  }
}
