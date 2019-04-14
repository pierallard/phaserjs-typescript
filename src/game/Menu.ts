import {PIXELS_WIDTH} from "../app";
import BitmapText = Phaser.BitmapText;

export default class Menu {
  private chipsLeft: number;
  private chipsLeftBitmap: BitmapText;

  constructor() {
    this.chipsLeft = 11;
  }

  create(game: Phaser.Game) {
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

  private static pad(n, width, z = '0') {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  updateChips(chips: number) {
    const remaining = Math.max(this.chipsLeft - chips, 0);
    this.chipsLeftBitmap.setText(' ' + Menu.pad(remaining, 3));
  }
}