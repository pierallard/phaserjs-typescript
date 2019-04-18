import {TILE_SIZE, TIME} from "../game_state/Play";
import Player from "../Player";
import Point from "../Point";
import {Cell, WaterCell} from "../cells/Cell";
import {Level} from "../levels/Level";
import Game = Phaser.Game;
import Group = Phaser.Group;
import {SENS} from "../Sens";

export abstract class GameObject {
  protected cells: Cell[][];
  protected sprite: Phaser.Sprite;
  protected position: Point;

  constructor(game: Phaser.Game, x: number, y: number, cells: Cell[][], objectGroup: Group) {
    this.cells = cells;
    this.sprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips', 0, objectGroup);
    this.position = new Point(x, y);
  }

  getPosition(): Point {
    return this.position;
  }

  act(game: Phaser.Game, player: Player, endPosition: PIXI.Point, level: Level) {
  }

  canPlayerGoTo(player: Player, endPosition: PIXI.Point, level: Level): boolean {
    return true;
  }

  canPackGoTo(player: Player, endPosition: Point, level: Level) {
    return true;
  }

  animateEnd(player: Player, endPosition: Point, level: Level, game: Game) {
  }

  destroy() {
    this.sprite.destroy(true);
  }

  isToxic(): boolean {
    return false;
  }

  update(game: Phaser.Game, level: Level) {
  }
}

export class Pack extends GameObject {
  constructor(game: Phaser.Game, x: number, y: number, cells: Cell[][], objectGroup: Group) {
    super(game, x, y, cells, objectGroup);

    this.sprite.frame = 19 + 64;
  }

  act(game: Phaser.Game, player: Player, endPosition: PIXI.Point, level: Level) {
    const newPosition = new Point(
      this.position.x + this.diff(player, endPosition).x,
      this.position.y + this.diff(player, endPosition).y
    );
    game.add.tween(this.sprite).to({
      x: newPosition.x * TILE_SIZE,
      y: newPosition.y * TILE_SIZE
    }, TIME, Phaser.Easing.Default, true);
    game.time.events.add(TIME, () => {
      this.position = newPosition;
      this.animateEnd(player, this.position, level, game);
      this.sprite.x = this.position.x * TILE_SIZE;
      this.sprite.y = this.position.y * TILE_SIZE;
    });
  }

  canPlayerGoTo(player: Player, endPosition: PIXI.Point, level: Level) {
    const newPosition = new Point(
      this.position.x + this.diff(player, endPosition).x,
      this.position.y + this.diff(player, endPosition).y
    );

    return level.canPackGoTo(player, newPosition);
  }

  canPackGoTo(player: Player, endPosition: Point, level: Level) {
    return false;
  }

  animateEnd(player: Player, endPosition: Point, level: Level, game: Game) {
    const cell = level.getCellAt(endPosition);
    if (cell instanceof WaterCell && cell.isWater()) {
      cell.changeAfterPack();
      level.animateWaterAt(game, endPosition);
      this.destroy();
      level.destroyObject(this);
    }
  }

  private diff(player: Player, endPosition: PIXI.Point): PIXI.Point {
    const playerPosition = player.getPosition();
    return new PIXI.Point(
      endPosition.x - playerPosition.x,
      endPosition.y - playerPosition.y
    );
  }
}

export class Ant extends GameObject {
  static ORDER: SENS[] = [SENS.UP, SENS.LEFT, SENS.DOWN, SENS.RIGHT];

  private isMoving: boolean = false;
  private sens: SENS;

  constructor(game: Phaser.Game, x: number, y: number, cells: Cell[][], objectGroup: Group) {
    super(game, x, y, cells, objectGroup);
    this.sens = SENS.UP;

    this.sprite.frame = 32*5;
    this.sprite.animations.add(SENS.LEFT, [164, 165, 166, 167], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add(SENS.RIGHT, [196, 197, 198, 199], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add(SENS.UP, [160, 161, 162, 163], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add(SENS.DOWN, [192, 193, 194, 195], Phaser.Timer.SECOND * 4 / TIME, true);
  }

  isToxic() {
    return true;
  }

  animateEnd(player: Player, endPosition: Point, level: Level, game: Game) {
    level.animateFireAt(game, player.getPosition());
    this.destroy();
  }

  update(game: Game, level: Level) {
    if (!this.isMoving) {
      this.isMoving = true;
      let sens = this.sens;
      let newPosition = this.getNewCell(sens);
      this.sens = Ant.ORDER[(Ant.ORDER.indexOf(this.sens) + 1) % Ant.ORDER.length];
      if (!level.isFreeForBug(newPosition)) {
        sens = Ant.ORDER[(Ant.ORDER.indexOf(sens) + 3) % Ant.ORDER.length];
        newPosition = this.getNewCell(sens);
        this.sens = Ant.ORDER[(Ant.ORDER.indexOf(this.sens) + 3) % Ant.ORDER.length];
        if (!level.isFreeForBug(newPosition)) {
          sens = Ant.ORDER[(Ant.ORDER.indexOf(sens) + 3) % Ant.ORDER.length];
          newPosition = this.getNewCell(sens);
          this.sens = Ant.ORDER[(Ant.ORDER.indexOf(this.sens) + 3) % Ant.ORDER.length];
          if (!level.isFreeForBug(newPosition)) {
            sens = Ant.ORDER[(Ant.ORDER.indexOf(sens) + 3) % Ant.ORDER.length];
            newPosition = this.getNewCell(sens);
            this.sens = Ant.ORDER[(Ant.ORDER.indexOf(this.sens) + 3) % Ant.ORDER.length];
            if (!level.isFreeForBug(newPosition)) {
              newPosition = this.getPosition();
              this.sens = Ant.ORDER[(Ant.ORDER.indexOf(this.sens) + 3) % Ant.ORDER.length];
            }
          }
        }
      }

      this.sprite.animations.play(this.sens + '');

      game.add.tween(this.sprite).to({
        x: newPosition.x * TILE_SIZE,
        y: newPosition.y * TILE_SIZE
      }, TIME, Phaser.Easing.Default, true);
      game.time.events.add(TIME, () => {
        this.isMoving = false;
        this.position = newPosition;
        this.sprite.x = this.position.x * TILE_SIZE;
        this.sprite.y = this.position.y * TILE_SIZE;
      }, this);
    }
  }

  private getNewCell(sens: SENS) {
    switch (sens) {
      case SENS.UP: return this.position.left();
      case SENS.LEFT: return this.position.down();
      case SENS.DOWN: return this.position.right();
      case SENS.RIGHT: return this.position.up();
    }
  }
}