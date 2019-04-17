import {TILE_SIZE, TIME} from "../game_state/Play";
import {BagItemKey} from "../BagItem";
import Player from "../Player";
import {COLOR, Level} from "../levels/Level";
import Game = Phaser.Game;
import Point from "../Point";

export abstract class Cell {
  protected sprite: Phaser.Sprite;

  constructor(game: Phaser.Game, x: number, y: number) {
    this.sprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips');
  }

  canPlayerGoTo(player: Player) {
    return true;
  }

  animateEnd(game: Game, player: Player, endPosition: Point) {
  }

  isDead() {
    return false;
  }

  animateBegin(player: Player) {
  }

  canPackGoTo(player: Player) {
    return this.canPlayerGoTo(player);
  }
}

export class EmptyCell extends Cell {
  static EMPTY_CELL = 0;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = EmptyCell.EMPTY_CELL;
  }
}

export class BlockCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = 14 + 32;
  }

  canPlayerGoTo(player: Player) {
    return false;
  }
}

export class ExitCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.animations.add('DEFAULT', [71, 72, 73], Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }
}

export class ExitDoor extends Cell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = 70;
  }

  canPlayerGoTo(player: Player): boolean {
    return player.canExit();
  }

  animateBegin(player: Player) {
    this.sprite.frame = EmptyCell.EMPTY_CELL;
  }
}

export class ChipCell extends EmptyCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = 74;
  }

  animateEnd(game: Game, player: Player, endPosition: Point) {
    if (this.sprite.frame !== ChipCell.EMPTY_CELL) {
      this.sprite.frame = EmptyCell.EMPTY_CELL;
      player.addChip();
    }
  }
}

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
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.BLUE;
    this.sprite.frame = 67;
  }
}

export class YellowDoorCell extends DoorCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.YELLOW;
    this.sprite.frame = 68;
  }
}

export class RedDoorCell extends DoorCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.RED;
    this.sprite.frame = 66;
  }
}

export class GreenDoorCell extends DoorCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.GREEN;
    this.sprite.frame = 69;
  }

  animateBegin(player: Player) {
    if (this.sprite.frame !== 0) {
      this.sprite.frame = 0;
    }
  }
}

abstract class KeyCell extends EmptyCell {
  protected keySprite: Phaser.Sprite;
  protected color: COLOR;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.keySprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips');
  }

  animateEnd(game: Game, player: Player, endPosition: Point) {
    this.keySprite.destroy();

    player.addItem(new BagItemKey(this.color));
  }
}

export class BlueKeyCell extends KeyCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.BLUE;
    this.keySprite.frame = 76;
  }
}

export class YellowKeyCell extends KeyCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.YELLOW;
    this.keySprite.frame = 77;
  }
}

export class RedKeyCell extends KeyCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.RED;
    this.keySprite.frame = 75;
  }
}

export class GreenKeyCell extends KeyCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.GREEN;
    this.keySprite.frame = 78;
  }
}

export class WaterCell extends Cell {
  private static WATER_ANIMATION: number[] = [24, 25, 26];
  private static DIRTY = 23;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = WaterCell.WATER_ANIMATION[0];
    this.sprite.animations.add('DEFAULT', WaterCell.WATER_ANIMATION, Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }

  isWater() {
    return (WaterCell.WATER_ANIMATION.indexOf(<number> this.sprite.frame) !== -1);
  }

  animateEnd(game: Game, player: Player, endPosition: Point) {
    if (this.sprite.frame === WaterCell.DIRTY) {
      this.sprite.frame = EmptyCell.EMPTY_CELL;
    } else if (this.isWater()) {
      Level.animateWaterAt(game, endPosition);
    }
  }

  isDead() {
    if (WaterCell.WATER_ANIMATION.indexOf(<number> this.sprite.frame) !== -1) {
      return true;
    }

    return false;
  }

  canPackGoTo(player: Player) {
    if (this.sprite.frame === WaterCell.DIRTY) {
      return false;
    }
    return super.canPackGoTo(player);
  }

  changeAfterPack() {
    this.sprite.animations.stop('DEFAULT');
    this.sprite.frame = WaterCell.DIRTY;
  }
}