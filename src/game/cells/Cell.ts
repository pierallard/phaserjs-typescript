import {TILE_SIZE, TIME} from "../game_state/Play";
import {BagItemKey} from "../BagItem";
import Player from "../Player";
import {COLOR} from "../levels/Level";

export abstract class Cell {
  protected sprite: Phaser.Sprite;

  constructor(game: Phaser.Game, x: number, y: number) {
    this.sprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips');
  }

  canPlayerGoTo(player: Player) {
    return true;
  }

  animateEnd(player: Player) {
  }

  isDead() {
    return false;
  }

  animateBegin(player: Player) {
  }
}

export class EmptyCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = 0;
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
    this.sprite.frame = 0;
  }
}

export class ChipCell extends EmptyCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = 74;
  }

  animateEnd(player: Player) {
    if (this.sprite.frame !== 0) {
      this.sprite.frame = 0;
      player.addChip();
    }
  }
}

abstract class DoorCell extends EmptyCell {
  protected color: COLOR;

  canPlayerGoTo(player: Player) {
    if (this.sprite.frame === 0) {
      return true;
    }
    return player.hasKey(this.color);
  }

  animateBegin(player: Player) {
    if (this.sprite.frame !== 0) {
      this.sprite.frame = 0;
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

  animateEnd(player: Player) {
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

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = WaterCell.WATER_ANIMATION[0];
    this.sprite.animations.add('DEFAULT', WaterCell.WATER_ANIMATION, Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }

  isDead() {
    if (WaterCell.WATER_ANIMATION.indexOf(<number> this.sprite.frame) !== -1) {
      return true;
    }

    return false;
  }

  changeAfterPack() {
    this.sprite.animations.stop('DEFAULT');
    this.sprite.frame = 23;
  }
}