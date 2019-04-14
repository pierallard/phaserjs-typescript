import Player from "../Player";
import {Ground} from "../Ground";

export const TILE_SIZE = 12;
export const TIME = Phaser.Timer.SECOND / 3;

export default class Play extends Phaser.State {
  private player: Player;
  private ground: Ground;

  constructor() {
    super();
    this.player = new Player();
    this.ground = new Ground();
  }

  public create(game: Phaser.Game) {
    game.world.setBounds(0, 0, 32 * TILE_SIZE, 32 * TILE_SIZE);
    this.ground.create(game);
    this.player.create(game);
  }

  public update(game: Phaser.Game) {
    this.player.update(game);
  }

  public render(game: Phaser.Game) {
    this.player.render(game);
  }
}
