import {PIXELS_WIDTH} from "../app";
import BitmapText = Phaser.BitmapText;
import {TIME} from "./game_state/Play";
import {Level} from "./levels/Level";
import {
  BlueKey, FireBoots, ForceBoots, GreenKey, IceBoots, RedKey, WaterBoots,
  YellowKey
} from "./game_objects/PickableObject";
import Game = Phaser.Game;
import Sprite = Phaser.Sprite;

class BagItem {
  private bottomSprite: Sprite;
  private sprite: Sprite;
  private klass;

  constructor(game: Game, x: number, y: number, frame: number, klass) {
    this.klass = klass;

    this.bottomSprite = game.add.sprite(x, y, 'chips', 0);
    this.bottomSprite.fixedToCamera = true;

    this.sprite = game.add.sprite(x, y, 'chips', frame);
    this.sprite.fixedToCamera = true;
  }

  public show() {
    this.bottomSprite.alpha = 1;
    this.sprite.alpha = 1;
  }

  public hide() {
    this.bottomSprite.alpha = 0;
    this.sprite.alpha = 0;
  }

  getKlass() {
    return this.klass;
  }
}

export default class Menu {
  private chipsLeftBitmap: BitmapText;
  private level: Level;
  private chipsLeft: number;
  private changeTime: number;
  private bagItems: BagItem[];

  constructor(level: Level) {
    this.level = level;
    this.bagItems = [];
  }

  create(game: Game) {
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

    let x = 107;
    let y = 73;
    let frame = 75;
    [
      RedKey,
      BlueKey,
      YellowKey,
      GreenKey,
      IceBoots,
      ForceBoots,
      FireBoots,
      WaterBoots,
    ].forEach((a) => {
      this.bagItems.push(new BagItem(game, x, y, frame, a));
      frame++;
      x += 12;
      if (x >= 107 + 12 * 4) {
        x = 107;
        y += 12;
      }
    });

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

    this.bagItems.forEach((bagItem: BagItem) => {
      if (this.level.getPlayer().has(bagItem.getKlass())) {
        bagItem.show();
      } else {
        bagItem.hide();
      }
    })
  }

  private static pad(n, width, z = '0') {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  private getChipsLeft(): number {
    return Math.max(this.level.getChipsNeeded() - this.level.getPlayer().getChips(), 0)
  }
}
