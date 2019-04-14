import Player from "../Player";
import {Ground, GROUND_SIZE} from "../Ground";
import {PIXELS_WIDTH} from "../../app";
import Menu from "../Menu";

export const TILE_SIZE = 12;
export const TIME = Phaser.Timer.SECOND / 4;
export const BLOCKTIME = TIME / 1.5;

export default class Play extends Phaser.State {
  private player: Player;
  private ground: Ground;
  private menu: Menu;

  constructor() {
    super();
    this.ground = new Ground();
    this.menu = new Menu();
    this.player = new Player(this.ground, this.menu);

  }

  public create(game: Phaser.Game) {
    game.world.setBounds(0, 0, GROUND_SIZE * TILE_SIZE, GROUND_SIZE * TILE_SIZE);
    game.camera.width = PIXELS_WIDTH;

    this.ground.create(game);
    this.player.create(game);
    this.menu.create(game);
  }

  public update(game: Phaser.Game) {
    this.player.update(game);
  }

  public render(game: Phaser.Game) {
    this.player.render(game);
  }
}
