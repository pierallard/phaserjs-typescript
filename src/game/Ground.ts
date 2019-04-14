import {TILE_SIZE} from "./game_state/Play";

export const GROUND_SIZE = 16;

export class Ground {
  create(game: Phaser.Game) {
    for (let y = 0; y < GROUND_SIZE; y++) {
      for (let x = 0; x < GROUND_SIZE; x++) {
        game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips', 0);
      }
    }
  }
}