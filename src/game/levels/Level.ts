import Player from "../Player";
import {LEVELS} from "./Levels";
import Point from "../Point";
import {Cell} from "../cells/Cell";
import Game = Phaser.Game;
import {TILE_SIZE, TIME} from "../game_state/Play";
import Group = Phaser.Group;
import WallCell from "../cells/WallCell";
import ExitCell from "../cells/ExitCell";
import {ExitDoor} from "../cells/ExitDoor";
import {BlueDoorCell, GreenDoorCell, RedDoorCell, YellowDoorCell} from "../cells/DoorCell";
import {WaterCell} from "../cells/WaterCell";
import {FireCell} from "../cells/FireCell";
import IceCell, {IceCellBottomLeft, IceCellBottomRight, IceCellTopLeft, IceCellTopRight} from "../cells/IceCell";
import {ForceBottomCell, ForceLeftCell, ForceRightCell, ForceTopCell} from "../cells/ForceCell";
import EmptyCell from "../cells/EmptyCell";
import {
  BlueKey, Chip, FireBoots, ForceBoots, GreenKey, IceBoots, RedKey, WaterBoots,
  YellowKey
} from "../game_objects/PickableObject";
import {GameObject} from "../game_objects/GameObject";
import SwitchWall from "../cells/SwitchWall";
import Switch from "../cells/Switch";
import Ant from "../game_objects/Ant";
import Pack from "../game_objects/Pack";
import Tank from "../game_objects/Tank";
import TankSwitch from "../cells/TankSwitch";
import RedButton from "../cells/RedButton";
import {FireThrower} from "../cells/FireThrower";
import PinkBall from "../game_objects/PinkBall";
import {BrownButton} from "../cells/BrownButton";
import {Glue} from "../cells/Glue";
import {Ghost} from "../game_objects/Ghost";
import {Bomb} from "../game_objects/Bomb";
import {BlueWall} from "../cells/BlueWall";
import {InvisibleWall} from "../cells/InvisibleWall";
import {Teleport} from "../cells/Teleport";
import {Thief} from "../cells/Thief";
import {BuildingWall} from "../cells/BuildingWall";
import {CellWithWallDown} from "../cells/CellWithWall";
import {Concrete} from "../cells/Concrete";
import {Sand} from "../cells/Sand";
import {Mouth} from "../game_objects/Mouth";
import FireBall from "../game_objects/FireBall";
import {SENS} from "../Sens";

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
  private objects: (GameObject|Player)[] = [];
  private effectsGroup: Group;
  private actions: number[][][];
  private objectsGroup: Phaser.Group;
  private player: Player;

  create(game: Phaser.Game, groundGroup: Group, objectGroup: Group, effectsGroup: Group) {
    this.effectsGroup = effectsGroup;
    this.objectsGroup = objectGroup;
    this.player = <Player> this.addObject(new Player(game, this, objectGroup));
    for (let y = 0; y < GROUND_SIZE; y++) {
      this.cells[y] = [];
      for (let x = 0; x < GROUND_SIZE; x++) {
        switch(this.letterAt(new PIXI.Point(x, y))) {
          case 'X': this.cells[y][x] = new WallCell(game, x, y, groundGroup); break;
          case 'E': this.cells[y][x] = new ExitCell(game, x, y, groundGroup); break;
          case 'D': this.cells[y][x] = new ExitDoor(game, x, y, groundGroup); break;
          case 'B': this.cells[y][x] = new BlueDoorCell(game, x, y, groundGroup); break;
          case 'Y': this.cells[y][x] = new YellowDoorCell(game, x, y, groundGroup); break;
          case 'R': this.cells[y][x] = new RedDoorCell(game, x, y, groundGroup); break;
          case 'G': this.cells[y][x] = new GreenDoorCell(game, x, y, groundGroup); break;
          case 'W': this.cells[y][x] = new WaterCell(game, x, y, groundGroup); break;
          case 'V':
          case 'F': this.cells[y][x] = new FireCell(game, x, y, groundGroup); break;
          case 'I': this.cells[y][x] = new IceCell(game, x, y, groundGroup); break;
          case '1': this.cells[y][x] = new IceCellBottomLeft(game, x, y, groundGroup); break;
          case '7': this.cells[y][x] = new IceCellTopLeft(game, x, y, groundGroup); break;
          case '9': this.cells[y][x] = new IceCellTopRight(game, x, y, groundGroup); break;
          case '3': this.cells[y][x] = new IceCellBottomRight(game, x, y, groundGroup); break;
          case '8': this.cells[y][x] = new ForceTopCell(game, x, y, groundGroup); break;
          case '2': this.cells[y][x] = new ForceBottomCell(game, x, y, groundGroup); break;
          case '4': this.cells[y][x] = new ForceLeftCell(game, x, y, groundGroup); break;
          case '6': this.cells[y][x] = new ForceRightCell(game, x, y, groundGroup); break;
          case 'S': this.cells[y][x] = new SwitchWall(game, x, y, groundGroup, true); break;
          case 'Q': this.cells[y][x] = new SwitchWall(game, x, y, groundGroup, false); break;
          case 'q': this.cells[y][x] = new Switch(game, x, y, groundGroup); break;
          case 't': this.cells[y][x] = new TankSwitch(game, x, y, groundGroup); break;
          case 's': this.cells[y][x] = new RedButton(game, x, y, groundGroup); break;
          case 'j': this.cells[y][x] = new BrownButton(game, x, y, groundGroup); break;
          case 'h': this.cells[y][x] = new FireThrower(game, x, y, groundGroup); break;
          case 'o': this.cells[y][x] = new Glue(game, x, y, groundGroup); break;
          case 'A': this.cells[y][x] = new BlueWall(game, x, y, groundGroup, true); break;
          case 'C': this.cells[y][x] = new BlueWall(game, x, y, groundGroup, false); break;
          case 'H': this.cells[y][x] = new InvisibleWall(game, x, y, groundGroup, false); break;
          case 'J': this.cells[y][x] = new InvisibleWall(game, x, y, groundGroup, true); break;
          case 'M': this.cells[y][x] = new Teleport(game, x, y, groundGroup, this); break;
          case 'K': this.cells[y][x] = new Thief(game, x, y, groundGroup); break;
          case 'L': this.cells[y][x] = new BuildingWall(game, x, y, groundGroup); break;
          case 'N': this.cells[y][x] = new CellWithWallDown(game, x, y, groundGroup); break;
          case 'O': this.cells[y][x] = new Concrete(game, x, y, groundGroup); break;
          case 'Z': this.cells[y][x] = new Sand(game, x, y, groundGroup); break;
          case 'w':
          case 'P':
          case 'a':
          case 'i':
          case 'f':
          case 'c':
          case 'b':
          case 'y':
          case 'r':
          case 'g':
          case '5':
          case 'p':
          case 'T':
          case 'U':
          case 'u':
          case 'e':
          case 'z':
          case 'd':
          case 'è':
          case 'é':
          case '(':
          case '&':
          case ' ': this.cells[y][x] = new EmptyCell(game, x, y, groundGroup); break;
          default:
            console.log('Unable to create cell from ' + this.letterAt(new PIXI.Point(x, y)));
            this.cells[y][x] = new EmptyCell(game, x, y, groundGroup);
        }
      }

      for (let x = 0; x < GROUND_SIZE; x++) {
        switch(this.letterAt(new PIXI.Point(x, y))) {
          case 'a': this.addObject(new Ant(game, x, y, objectGroup)); break;
          case 'U':
            this.addObject(new Chip(game, x, y, objectGroup));
            this.addObject(new Pack(game, x, y, objectGroup));
            break;
          case 'V':
          case 'p': this.addObject(new Pack(game, x, y, objectGroup)); break;
          case 'w': this.addObject(new WaterBoots(game, x, y, objectGroup)); break;
          case 'i': this.addObject(new IceBoots(game, x, y, objectGroup)); break;
          case 'f': this.addObject(new FireBoots(game, x, y, objectGroup)); break;
          case '5': this.addObject(new ForceBoots(game, x, y, objectGroup)); break;
          case 'c': this.addObject(new Chip(game, x, y, objectGroup)); break;
          case 'b': this.addObject(new BlueKey(game, x, y, objectGroup)); break;
          case 'y': this.addObject(new YellowKey(game, x, y, objectGroup)); break;
          case 'r': this.addObject(new RedKey(game, x, y, objectGroup)); break;
          case 'g': this.addObject(new GreenKey(game, x, y, objectGroup)); break;
          case 'T': this.addObject(new Tank(game, x, y, objectGroup)); break;
          case 'u': this.addObject(new PinkBall(game, x, y, objectGroup)); break;
          case 'e': this.addObject(new Ghost(game, x, y, objectGroup)); break;
          case 'z': this.addObject(new Bomb(game, x, y, objectGroup)); break;
          case 'd': this.addObject(new Mouth(game, x, y, objectGroup)); break;
          case 'è': this.addObject(new FireBall(game, x, y, objectGroup, SENS.LEFT)); break;
          case 'é': this.addObject(new FireBall(game, x, y, objectGroup, SENS.RIGHT)); break;
          case '(': this.addObject(new FireBall(game, x, y, objectGroup, SENS.DOWN)); break;
          case '&': this.addObject(new FireBall(game, x, y, objectGroup, SENS.UP)); break;
        }
      }
    }
    this.actions.forEach((actions: number[][]) => {
      const source = new Point(actions[0][0], actions[0][1]);
      const dest = new Point(actions[1][0], actions[1][1]);

      const sourceCell = this.getCellAt(source);
      const destCell = this.getCellAt(dest);

      sourceCell.setDestination(destCell);
    })
  }

  constructor(map: string[], chipsNeeded: number, actions: number[][][]) {
    this.map = map;
    this.chipsNeeded = chipsNeeded;
    this.actions = actions;
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

  isMoveAllowed(actor: GameObject, sourcePosition: Point, endPosition: Point) {
    if (endPosition.x < 0) {
      return false;
    }
    if (endPosition.x >= GROUND_SIZE) {
      return false;
    }
    if (endPosition.y < 0) {
      return false;
    }
    if (endPosition.y >= GROUND_SIZE) {
      return false;
    }
    if (!this.cells[endPosition.y][endPosition.x].canActorGoToMe(actor)) {
      return false;
    }
    if (!this.cells[sourcePosition.y][sourcePosition.x].canActorGoOutOfMe(this, actor, endPosition)) {
      return false;
    }
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].getPosition().equals(endPosition)) {
        if (!this.objects[i].canActorGoToMe(actor, endPosition, this)) {
          return false;
        }
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

  animateEnd(game: Game, actor: GameObject, endPosition: Point) {
    this.cells[endPosition.y][endPosition.x].animateEnd(game, this, actor, endPosition);
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].getPosition().equals(endPosition)) {
        actor.animateEnd(game, this, this.objects[i], endPosition);
        this.objects[i].animateEnd(game, this, actor, endPosition);
      }
    }
  }

  animatePush(game: Game, actor: GameObject, endPosition: Point) {
    this.cells[endPosition.y][endPosition.x].animatePush(game, this, actor, endPosition);
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].getPosition().equals(endPosition)) {
        this.objects[i].animatePush(game, this, actor, endPosition);
      }
    }
  }

  animatePlayerBegin(game: Game, player: Player, endPosition: Point) {
    this.cells[endPosition.y][endPosition.x].animatePlayerBegin(game, this, player, endPosition);
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].getPosition().equals(endPosition)) {
        this.objects[i].animatePlayerBegin(game, this, player, endPosition);
      }
    }
  }

  static getFromNumber(levelNumber: number): Level {
    return new Level(
      LEVELS[levelNumber].map,
      LEVELS[levelNumber].chips,
      LEVELS[levelNumber].actions
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

  getCellAt(endPosition: Point): Cell {
    return this.cells[endPosition.y][endPosition.x];
  }

  destroyObject(param: GameObject) {
    const i = this.objects.indexOf(param);

    this.objects.splice(i, 1);
  }

  animateWaterAt(game: Game, endPosition: Point) {
    const water = game.add.sprite((endPosition.x - 0.5) * TILE_SIZE, (endPosition.y - 0.5) * TILE_SIZE, 'chips2', 0, this.effectsGroup);
    water.animations.add('DEFAULT', [0, 1, 2, 3, 4, 5]);
    water.animations.play('DEFAULT', Phaser.Timer.SECOND * 3 / TIME, false, true);
  }

  animateFireAt(game: Game, endPosition: Point) {
    const fire = game.add.sprite((endPosition.x - 0.5) * TILE_SIZE, (endPosition.y - 0.5) * TILE_SIZE, 'chips2', 0, this.effectsGroup);
    fire.animations.add('DEFAULT', [6, 7, 8, 9, 10, 11]);
    fire.animations.play('DEFAULT', Phaser.Timer.SECOND * 3 / TIME, false, true);
  }

  update(game: Phaser.Game) {
    this.objects.forEach((o) => {
      o.update(game, this);
    })
  }

  switchWalls() {
    for (let y = 0; y < this.cells.length; y++) {
      for (let x = 0; x < this.cells[y].length; x++) {
        if (this.cells[y][x] instanceof SwitchWall) {
          (<SwitchWall> this.cells[y][x]).switch();
        }
      }
    }
  }

  switchTanks() {
    this.objects.forEach((o) => {
      if (o instanceof Tank) {
        (<Tank> o).switch();
      }
    });
  }

  getObjectAt(source: Point) {
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].getPosition().equals(source)) {
        return this.objects[i];
      }
    }

    return undefined;
  }

  getObjectGroup(): Phaser.Group {
    return this.objectsGroup;
  }

  addObject(object: GameObject|Player) {
    this.objects.push(object);

    return object;
  }

  getPlayer(searchOnMap: boolean = false): Player {
    if (searchOnMap) {
      for (let i = 0; i < this.objects.length; i++) {
        if (this.objects[i] instanceof Player) {
          return <Player> this.objects[i];
        }
      }

      return null;
    }
    return this.player;
  }
}
