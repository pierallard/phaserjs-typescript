import Player from "../Player";
import {COLOR} from "../levels/Level";
import EmptyCell from "./EmptyCell";
import Group = Phaser.Group;

abstract class DoorCell extends EmptyCell {
  protected color: COLOR;

  canPlayerGoTo(player: Player) {
    if (this.sprite.frame === EmptyCell.EMPTY_CELL) {
      return true;
    }
    return player.hasKey(this.color);
  }

  animateBegin(player: Player) {
    if (this.sprite.frame !== EmptyCell.EMPTY_CELL) {
      this.sprite.frame = EmptyCell.EMPTY_CELL;
      player.removeKey(this.color);
    }
  }
}

export class BlueDoorCell extends DoorCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.color = COLOR.BLUE;
    this.sprite.frame = 67;
  }
}

export class YellowDoorCell extends DoorCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.color = COLOR.YELLOW;
    this.sprite.frame = 68;
  }
}

export class RedDoorCell extends DoorCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.color = COLOR.RED;
    this.sprite.frame = 66;
  }
}

export class GreenDoorCell extends DoorCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.color = COLOR.GREEN;
    this.sprite.frame = 69;
  }

  animateBegin(player: Player) {
    if (this.sprite.frame !== 0) {
      this.sprite.frame = 0;
    }
  }
}