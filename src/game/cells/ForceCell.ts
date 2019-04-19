import {TIME} from "../game_state/Play";
import Player from "../Player";
import Point from "../Point";
import {Cell} from "./Cell";
import Group = Phaser.Group;

export class ForceTopCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.animations.add('DEFAULT', [1, 2, 3, 4], Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }

  forceCell(player: Player): Point {
    return this.position.up();
  }
}

export class ForceBottomCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.animations.add('DEFAULT', [9, 10, 11, 12], Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }

  forceCell(player: Player): Point {
    return this.position.down();
  }
}

export class ForceLeftCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.animations.add('DEFAULT', [5, 6, 7, 8], Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }

  forceCell(player: Player): Point {
    return this.position.left();
  }
}

export class ForceRightCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.animations.add('DEFAULT', [13, 14, 15, 16], Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }

  forceCell(player: Player): Point {
    return this.position.right();
  }
}