import {TILE_SIZE} from "./game_state/Play";

export const GROUND_SIZE = 16;

export class Ground {
  private blocks: PIXI.Point[];

  constructor() {
    this.blocks = [
      new PIXI.Point(10, 10)
    ];
  }

  create(game: Phaser.Game) {
    for (let y = 0; y < GROUND_SIZE; y++) {
      for (let x = 0; x < GROUND_SIZE; x++) {
        if (this.isBlock(new PIXI.Point(x, y))) {
          game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips', 14+32);
        } else {
          game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips', 0);
        }
      }
    }
  }

  isCellAccessible(point: PIXI.Point) {
    return !this.isBlock(point);
  }

  private isBlock(p: PIXI.Point): boolean {
    return this.blocks.find((point) => { return point.x === p.x && point.y === p.y }) !== undefined;
  }
}