import {TILE_SIZE} from "./game_state/Play";

export class Ground {
  create(game: Phaser.Game) {
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips', 0);
      }
    }
  }
}