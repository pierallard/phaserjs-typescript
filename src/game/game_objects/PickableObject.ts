import {GameObject} from "./GameObject";
import Group = Phaser.Group;
import Player from "../Player";
import {COLOR, Level} from "../levels/Level";
import Point from "../Point";
import Game = Phaser.Game;

export abstract class PickableObject extends GameObject {
  animatePlayerEnd(game: Game, level: Level, player: Player, endPosition: Point) {
    player.addItem(this);
    this.destroy();
    level.destroyObject(this);
  }
}

export class Chip extends PickableObject {
  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Group) {
    super(game, x, y, objectGroup);

    this.sprite.frame = 74;
  }
}

export class WaterBoots extends PickableObject {
  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Group) {
    super(game, x, y, objectGroup);

    this.sprite.frame = 64 + 18;
  }
}

export class IceBoots extends PickableObject {
  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Group) {
    super(game, x, y, objectGroup);

    this.sprite.frame = 64 + 15;
  }
}

export class ForceBoots extends PickableObject {
  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Group) {
    super(game, x, y, objectGroup);

    this.sprite.frame = 64 + 16;
  }
}

export class FireBoots extends PickableObject {
  constructor(game: Phaser.Game, x: number, y: number, objectGroup: Group) {
    super(game, x, y, objectGroup);

    this.sprite.frame = 64 + 17;
  }
}

export abstract class Key extends PickableObject {
  protected color: COLOR;

  getColor(): COLOR {
    return this.color
  }
}

export class BlueKey extends Key {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.color = COLOR.BLUE;
    this.sprite.frame = 76;
  }
}

export class YellowKey extends Key {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.color = COLOR.YELLOW;
    this.sprite.frame = 77;
  }
}

export class RedKey extends Key {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.color = COLOR.RED;
    this.sprite.frame = 75;
  }
}

export class GreenKey extends Key {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.color = COLOR.GREEN;
    this.sprite.frame = 78;
  }
}
