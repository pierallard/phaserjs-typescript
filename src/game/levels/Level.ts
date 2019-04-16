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

  animateEnd(player: Player) {
  }

  isDead() {
    return false;
  }

  animateBegin(player: Player) {
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

  animateBegin(player: Player) {
    this.sprite.frame = 0;
  }
}

class ChipCell extends EmptyCell {
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

  isAccessible(player: Player) {
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

abstract class GameObject {
  protected cells: Cell[][];
  protected sprite: Phaser.Sprite;
  protected position: PIXI.Point;

  constructor(game: Phaser.Game, x: number, y: number, cells: Cell[][]) {
    this.cells = cells;
    this.sprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips');
    this.position = new PIXI.Point(x, y);
  }

  getPosition() {
    return this.position;
  }

  act(game: Phaser.Game, player: Player, endPosition: PIXI.Point) {
  }

  isAccessible(player: Player, endPosition: PIXI.Point): boolean {
    return true;
  }
}

class Pack extends GameObject {
  constructor(game: Phaser.Game, x: number, y: number, cells: Cell[][]) {
    super(game, x, y, cells);

    this.sprite.frame = 19 + 64;
  }

  act(game: Phaser.Game, player: Player, endPosition: PIXI.Point) {
    const newPosition = new PIXI.Point(
      this.position.x + this.diff(player, endPosition).x,
      this.position.y + this.diff(player, endPosition).y
    );
    game.add.tween(this.sprite).to({
      x: newPosition.x * TILE_SIZE,
      y: newPosition.y * TILE_SIZE
    }, TIME, Phaser.Easing.Default, true);
    game.time.events.add(TIME, () => {
      this.position = newPosition;
      this.sprite.x = this.position.x * TILE_SIZE;
      this.sprite.y = this.position.y * TILE_SIZE;
    });
  }

  isAccessible(player: Player, endPosition: PIXI.Point) {
    const newPosition = new PIXI.Point(
      this.position.x + this.diff(player, endPosition).x,
      this.position.y + this.diff(player, endPosition).y
    );

    return this.cells[newPosition.y][newPosition.x].isAccessible(player);
  }

  private diff(player: Player, endPosition: PIXI.Point): PIXI.Point {
    const playerPosition = player.getPosition();
    return new PIXI.Point(
      endPosition.x - playerPosition.x,
      endPosition.y - playerPosition.y
    );
  }
}

export class Level {
  protected map = [];
  protected chipsNeeded: number;
  private cells: Cell[][] = [];
  private objects: GameObject[] = [];

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
          case 'p': this.cells[y][x] = new EmptyCell(game, x, y); this.objects.push(new Pack(game, x, y, this.cells)); break;
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

  isCellAccessible(player: Player, endPosition: PIXI.Point) {
    if (!this.cells[endPosition.y][endPosition.x].isAccessible(player)) {
      return false;
    }
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].getPosition().x === endPosition.x && this.objects[i].getPosition().y === endPosition.y) {
        console.log('ask is accessible');
        return this.objects[i].isAccessible(player, endPosition);
      }
    }

    return true;
  }

  private letterAt(point: PIXI.Point) {
    if (point.y >= this.map.length) {
      return ' ';
    }
    return this.map[point.y][point.x];
  }

  animateEnd(game: Phaser.Game, player: Player, endPosition: PIXI.Point) {
    this.cells[endPosition.y][endPosition.x].animateEnd(player);
  }

  animateBegin(game: Phaser.Game, player: Player, endPosition: PIXI.Point) {
    this.cells[endPosition.y][endPosition.x].animateBegin(player);
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].getPosition().x === endPosition.x && this.objects[i].getPosition().y === endPosition.y) {
        this.objects[i].act(game, player, endPosition);
      }
    }
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
