import {TILE_SIZE, TIME} from "./game_state/Play";
import Player from "./Player";
import {BagItem, BagItemKey} from "./BagItem";

export const GROUND_SIZE = 32;

export enum COLOR {
  RED,
  BLUE,
  YELLOW,
  GREEN
}

class Cell {
  protected sprite: Phaser.Sprite;

  constructor(game: Phaser.Game, x: number, y: number) {
    this.sprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips');
  }

  isAccessible(player: Player) {
    return true;
  }

  act(player: Player) {
  }
}

class EmptyCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = 0;
  }
}

class BlockCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = 14 + 32;
  }

  isAccessible(player: Player) {
    return false;
  }
}

class ExitCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.animations.add('DEFAULT', [71, 72, 73], Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }
}

class ExitDoor extends Cell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = 70;
  }

  isAccessible(player: Player) {
    return player.hasAllChips();
  }
}

class ChipCell extends EmptyCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = 74;
  }
}

abstract class DoorCell extends EmptyCell {
  protected color: COLOR;

  isAccessible(player: Player) {
    if (this.sprite.frame === 0) {
      return true;
    }
    return player.hasKey(this.color);
  }

  act(player: Player) {
    this.sprite.frame = 0;
    player.removeKey(this.color);
  }
}

class BlueDoorCell extends DoorCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.BLUE;
    this.sprite.frame = 67;
  }
}

class YellowDoorCell extends DoorCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.YELLOW;
    this.sprite.frame = 68;
  }
}

class RedDoorCell extends DoorCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.RED;
    this.sprite.frame = 66;
  }
}

class GreenDoorCell extends DoorCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.GREEN;
    this.sprite.frame = 69;
  }
}

abstract class KeyCell extends EmptyCell {
  protected keySprite: Phaser.Sprite;
  protected color: COLOR;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.keySprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips');
  }

  act(player: Player) {
    this.keySprite.destroy();
    player.addItem(new BagItemKey(this.color));
  }
}

class BlueKeyCell extends KeyCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.BLUE;
    this.keySprite.frame = 76;
  }
}

class YellowKeyCell extends KeyCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.YELLOW;
    this.keySprite.frame = 77;
  }
}
class RedKeyCell extends KeyCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.RED;
    this.keySprite.frame = 75;
  }
}

class GreenKeyCell extends KeyCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.color = COLOR.GREEN;
    this.keySprite.frame = 78;
  }
}

export class Ground {
  private map = [
    '                                ',
    '                                ',
    '                                ',
    '                                ',
    '                                ',
    '                                ',
    '                                ',
    '                                ',
    '          XXXXX XXXXX           ',
    '          X   XXX   X           ',
    '          X c XEX c X           ',
    '        XXXXXGXDXGXXXXX         ',
    '        X y B     R y X         ',
    '        X c Xb   rX c X         ',
    '        XXXXXc P cXXXXX         ',
    '        X c Xb   rX c X         ',
    '        X   R  c  B   X         ',
    '        XXXXXXYXYXXXXXX         ',
    '            X  X  X             ',
    '            X cXc X             ',
    '            X  Xg X             ',
    '            XXXXXXX             '
  ];

  private cells: Cell[][] = [];

  create(game: Phaser.Game) {
    for (let y = 0; y < GROUND_SIZE; y++) {
      this.cells[y] = [];
      for (let x = 0; x < GROUND_SIZE; x++) {
        switch(this.letterAt(new PIXI.Point(x, y))) {
          case 'X': this.cells[y][x] = new BlockCell(game, x, y); break;
          case 'E': this.cells[y][x] = new ExitCell(game, x, y); break;
          case 'D': this.cells[y][x] = new ExitDoor(game, x, y); break;
          case 'c': this.cells[y][x] = new ChipCell(game, x, y); break;
          case 'B': this.cells[y][x] = new BlueDoorCell(game, x, y); break;
          case 'Y': this.cells[y][x] = new YellowDoorCell(game, x, y); break;
          case 'R': this.cells[y][x] = new RedDoorCell(game, x, y); break;
          case 'G': this.cells[y][x] = new GreenDoorCell(game, x, y); break;
          case 'b': this.cells[y][x] = new BlueKeyCell(game, x, y); break;
          case 'y': this.cells[y][x] = new YellowKeyCell(game, x, y); break;
          case 'r': this.cells[y][x] = new RedKeyCell(game, x, y); break;
          case 'g': this.cells[y][x] = new GreenKeyCell(game, x, y); break;
          case ' ':
          default: this.cells[y][x] = new EmptyCell(game, x, y);
        }
      }
    }
  }

  getPlayerPosition(): PIXI.Point {
    for (let y = 0; y < GROUND_SIZE; y++) {
      for (let x = 0; x < GROUND_SIZE; x++) {
        if (this.letterAt(new PIXI.Point(x, y)) === 'P') {
          return new PIXI.Point(x, y);
        }
      }
    }
  }

  isCellAccessible(player: Player, point: PIXI.Point) {
    return this.cells[point.y][point.x].isAccessible(player);
  }

  private letterAt(point: PIXI.Point) {
    if (point.y >= this.map.length) {
      return ' ';
    }
    return this.map[point.y][point.x];
  }

  act(player: Player, position: PIXI.Point) {
    this.cells[position.y][position.x].act(player);
  }
}