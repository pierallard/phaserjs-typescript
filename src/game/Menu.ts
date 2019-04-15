import {PIXELS_WIDTH} from "../app";
import BitmapText = Phaser.BitmapText;
import {Level} from "./Level";
import Player from "./Player";
import {TIME} from "./game_state/Play";

export default class Menu {
  private chipsLeftBitmap: BitmapText;
  private level: Level;
  private player: Player;
  private chipsLeft: number;
  private changeTime: number;

  constructor(level: Level, player: Player) {
    this.level = level;
    this.player = player;
  }

  create(game: Phaser.Game) {
    this.chipsLeft = this.getChipsLeft();

    const menu = game.add.sprite(PIXELS_WIDTH, 0, 'menu');
    menu.fixedToCamera = true;

    const top = 10;
    const gap = 9;
    const size = 6.5;
    const left = 114;
    game.add.bitmapText(left, top, 'carrier_command', 'Level', size).fixedToCamera = true;
    game.add.bitmapText(left, top + gap, 'carrier_command', ' 149', size).fixedToCamera = true;
    game.add.bitmapText(left, top + 2*gap, 'carrier_command', 'Time:', size).fixedToCamera = true;
    game.add.bitmapText(left, top + 3*gap, 'carrier_command', ' 965', size).fixedToCamera = true;
    game.add.bitmapText(left, top + 4*gap, 'carrier_command', 'Chips', size).fixedToCamera = true;
    game.add.bitmapText(left, top + 5*gap, 'carrier_command', 'Left:', size).fixedToCamera = true;
    this.chipsLeftBitmap = game.add.bitmapText(left, top + 6*gap, 'carrier_command', ' ' + Menu.pad(this.chipsLeft, 3), size);
    this.chipsLeftBitmap.fixedToCamera = true;
  }

  update(game: Phaser.Game) {
    if (this.changeTime && game.time.now >= this.changeTime) {
      if (this.chipsLeftBitmap.alpha === 0) {
        this.chipsLeftBitmap.alpha = 1;
      } else {
        this.chipsLeftBitmap.alpha = 0;
      }
      this.changeTime = game.time.now + TIME * 2;
    }
    const oldChipsLeft = this.chipsLeft;
    if (oldChipsLeft !== this.getChipsLeft()) {
      this.chipsLeft = this.getChipsLeft();
      this.chipsLeftBitmap.setText(' ' + Menu.pad(this.chipsLeft, 3));
      if (this.chipsLeft === 0) {
        this.changeTime = game.time.now + TIME * 2;
      } else {
        this.changeTime = null;
        this.chipsLeftBitmap.alpha = 1;
      }
    }
  }

  private static pad(n, width, z = '0') {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  private getChipsLeft(): number {
    return Math.max(this.level.getChipsNeeded() - this.player.getChips(), 0)
  }
}
