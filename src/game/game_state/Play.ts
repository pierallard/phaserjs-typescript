import Player from "../Player";
import {Level, GROUND_SIZE} from "../Level";
import {PIXELS_WIDTH} from "../../app";
import Menu from "../Menu";

export const TILE_SIZE = 12;
export const TIME = Phaser.Timer.SECOND / 4;
export const BLOCKTIME = TIME / 1.5;

export default class Play extends Phaser.State {
  private player: Player;
  private level: Level;
  private menu: Menu;

  constructor() {
    super();
    this.level = new Level();
    this.player = new Player(this.level);
    this.menu = new Menu(this.level, this.player);
  }

  public create(game: Phaser.Game) {
    game.world.setBounds(0, 0, GROUND_SIZE * TILE_SIZE, GROUND_SIZE * TILE_SIZE);
    game.camera.width = PIXELS_WIDTH;

    this.level.create(game);
    this.player.create(game);
    this.menu.create(game);
  }

  public update(game: Phaser.Game) {
    this.player.update(game);
    this.menu.update(game);
  }

  public render(game: Phaser.Game) {
    this.player.render(game);
  }
}
