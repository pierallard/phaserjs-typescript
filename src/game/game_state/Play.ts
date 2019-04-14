import Player from "../Player";
import {Ground, GROUND_SIZE} from "../Ground";

export const TILE_SIZE = 12;
export const TIME = Phaser.Timer.SECOND / 3;
export const BLOCKTIME = TIME / 1.5;

export default class Play extends Phaser.State {
  private player: Player;
  private ground: Ground;

  constructor() {
    super();
    this.ground = new Ground();
    this.player = new Player(this.ground);
  }

  public create(game: Phaser.Game) {
    game.world.setBounds(0, 0, GROUND_SIZE * TILE_SIZE, GROUND_SIZE * TILE_SIZE);
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
