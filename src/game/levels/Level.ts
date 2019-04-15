import {TILE_SIZE, TIME} from "../game_state/Play";
import Player from "../Player";
import {BagItemKey} from "../BagItem";
import {LEVELS} from "./Levels";

export const GROUND_SIZE = 32;

export enum COLOR {
  RED = 'RED',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN'
}

abstract class Cell {
  protected sprite: Phaser.Sprite;

  constructor(game: Phaser.Game, x: number, y: number) {
    this.sprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips');
  }

  isAccessible(player: Player) {
    return true;
  }

  act(player: Player) {
  }

  isDead() {
    return false;
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

  isAccessible(player: Player): boolean {
    return player.canExit();
  }

  act(player: Player) {
    this.sprite.frame = 0;
  }
}

class ChipCell extends EmptyCell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.frame = 74;
  }

  act(player: Player) {
    if (this.sprite.frame !== 0) {
      this.sprite.frame = 0;
      player.addChip();
    }
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
    if (this.sprite.frame !== 0) {
      this.sprite.frame = 0;
      player.removeKey(this.color);
    }
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

  act(player: Player) {
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

class WaterCell extends Cell {
  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y);

    this.sprite.animations.add('DEFAULT', [24, 25, 26], Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }

  isDead() {
    return true;
  }
}

export class Level {
  protected map = [];
  protected chipsNeeded: number;
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
          case 'w': this.cells[y][x] = new WaterCell(game, x, y); break;
          case ' ': this.cells[y][x] = new EmptyCell(game, x, y); break;
          default:
            console.log('Unable to create cell from ' + this.letterAt(new PIXI.Point(x, y)));
            this.cells[y][x] = new EmptyCell(game, x, y);
        }
      }
    }
  }

  constructor(map: string[], chipsNeeded: number) {
    this.map = map;
    this.chipsNeeded = chipsNeeded;
  }

  getChipsNeeded(): number {
    return this.chipsNeeded;
  }

  getPlayerPosition(): PIXI.Point {
    for (let y = 0; y < GROUND_SIZE; y++) {
      for (let x = 0; x < GROUND_SIZE; x++) {
        if (this.letterAt(new PIXI.Point(x, y)) === 'P') {
          return new PIXI.Point(x, y);
        }
      }
    }

    return new PIXI.Point(0, 0);
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

  static getFromNumber(levelNumber: number): Level {
    console.log(levelNumber);
    return new Level(
      LEVELS[levelNumber].map,
      LEVELS[levelNumber].chips
    );
  }

  getEndPosition(): PIXI.Point {
    for (let y = 0; y < GROUND_SIZE; y++) {
      for (let x = 0; x < GROUND_SIZE; x++) {
        if (this.letterAt(new PIXI.Point(x, y)) === 'E') {
          return new PIXI.Point(x, y);
        }
      }
    }

    return new PIXI.Point(0, 0);
  }

  getDeadPositions(): PIXI.Point[] {
    let result = [];
    for (let y = 0; y < this.cells.length; y++) {
      for (let x = 0; x < this.cells[y].length; x++) {
        if (this.cells[y][x].isDead()) {
          result.push(new PIXI.Point(x, y));
        }
      }
    }

    return result;
  }
}
