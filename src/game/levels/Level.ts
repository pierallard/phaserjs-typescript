import Player from "../Player";
import {LEVELS} from "./Levels";
import Point from "../Point";
import {Bug, GameObject, Pack} from "../game_objects/GameObject";
import {
  BlockCell, BlueDoorCell, BlueKeyCell, Cell, ChipCell, EmptyCell, ExitCell, ExitDoor, GreenDoorCell, GreenKeyCell,
  RedDoorCell,
  RedKeyCell, WaterCell,
  YellowDoorCell, YellowKeyCell
} from "../cells/Cell";
import Game = Phaser.Game;
import {TILE_SIZE, TIME} from "../game_state/Play";

export const GROUND_SIZE = 32;

export enum COLOR {
  RED = 'RED',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN'
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
          case 'P':
          case ' ': this.cells[y][x] = new EmptyCell(game, x, y); break;
          case '1': this.cells[y][x] = new EmptyCell(game, x, y); this.objects.push(new Bug(game, x, y, this.cells)); break;
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

  getPlayerPosition(): Point {
    for (let y = 0; y < GROUND_SIZE; y++) {
      for (let x = 0; x < GROUND_SIZE; x++) {
        if (this.letterAt(new PIXI.Point(x, y)) === 'P') {
          return new Point(x, y);
        }
      }
    }

    return new Point(0, 0);
  }

  canPlayerGoTo(player: Player, endPosition: Point) {
    if (!this.cells[endPosition.y][endPosition.x].canPlayerGoTo(player)) {
      return false;
    }
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].getPosition().equals(endPosition)) {
        console.log('ask player accessible for ' + this.objects[i].getPosition().x + ', ' + this.objects[i].getPosition().y);
        return this.objects[i].canPlayerGoTo(player, endPosition, this);
      }
    }

    return true;
  }

  canPackGoTo(player: Player, endPosition: Point) {
    if (!this.cells[endPosition.y][endPosition.x].canPackGoTo(player)) {
      return false;
    }

    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].getPosition().equals(endPosition)) {
        console.log('ask pack accessible for ' + this.objects[i].getPosition().x + ', ' + this.objects[i].getPosition().y);
        return this.objects[i].canPackGoTo(player, endPosition, this);
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

  animateEnd(game: Phaser.Game, player: Player, endPosition: Point) {
    this.cells[endPosition.y][endPosition.x].animateEnd(game, player, endPosition);

    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].getPosition().equals(endPosition)) {
        this.objects[i].animateEnd(player, endPosition, this, game);
      }
    }
  }

  animateBegin(game: Phaser.Game, player: Player, endPosition: Point) {
    this.cells[endPosition.y][endPosition.x].animateBegin(player);
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].getPosition().equals(endPosition)) {
        this.objects[i].act(game, player, endPosition, this);
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

  getEndPosition(): Point {
    for (let y = 0; y < GROUND_SIZE; y++) {
      for (let x = 0; x < GROUND_SIZE; x++) {
        if (this.letterAt(new PIXI.Point(x, y)) === 'E') {
          return new Point(x, y);
        }
      }
    }

    return new Point(0, 0);
  }

  getDeadPositions(): Point[] {
    let result = [];
    for (let y = 0; y < this.cells.length; y++) {
      for (let x = 0; x < this.cells[y].length; x++) {
        if (this.cells[y][x].isDead()) {
          result.push(new Point(x, y));
        }
      }
    }

    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].isToxic()) {
        result.push(this.objects[i].getPosition());
      }
    }

    return result;
  }

  getCellAt(endPosition: Point): Cell {
    return this.cells[endPosition.y][endPosition.x];
  }

  destroyObject(param: GameObject) {
    const i = this.objects.indexOf(param);

    this.objects.splice(i, 1);
  }

  static animateWaterAt(game: Game, endPosition: Point) {
    const water = game.add.sprite((endPosition.x - 0.5) * TILE_SIZE, (endPosition.y - 0.5) * TILE_SIZE, 'chips2');
    water.animations.add('DEFAULT', [0, 1, 2, 3, 4, 5]);
    water.animations.play('DEFAULT', Phaser.Timer.SECOND * 3 / TIME, false, true);
  }

  static animateFireAt(game: Game, endPosition: Point) {
    const fire = game.add.sprite((endPosition.x - 0.5) * TILE_SIZE, (endPosition.y - 0.5) * TILE_SIZE, 'chips2');
    fire.animations.add('DEFAULT', [6, 7, 8, 9, 10, 11]);
    fire.animations.play('DEFAULT', Phaser.Timer.SECOND * 3 / TIME, false, true);
  }
}
