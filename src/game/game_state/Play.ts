import Player from "../Player";

export const TILE_SIZE = 12;
export const TIME = Phaser.Timer.SECOND / 3;

export default class Play extends Phaser.State {
  private player: Player;

  constructor() {
    super();
    this.player = new Player();
  }

  public create(game: Phaser.Game) {
    this.player.create(game);
  }

  public update(game: Phaser.Game) {
    this.player.update(game);
  }
}
