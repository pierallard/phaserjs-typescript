import Sprite = Phaser.Sprite;
import {BLOCKTIME, TILE_SIZE, TIME} from "./game_state/Play";
import {COLOR, Level, GROUND_SIZE} from "./Level";
import {BagItem, BagItemKey} from "./BagItem";

export default class Player {
  private static ANIMATION_LEFT = 'LEFT';
  private static ANIMATION_RIGHT = 'RIGHT';
  private static ANIMATION_UP = 'UP';
  private static ANIMATION_DOWN = 'DOWN';
  private sprite: Sprite;
  private position: PIXI.Point;
  private chips: number;

  private leftKey: Phaser.Key;
  private rightKey: Phaser.Key;
  private upKey: Phaser.Key;
  private downKey: Phaser.Key;

  private pressedKeys: Phaser.Key[] = [];
  private isProcessing: boolean = false;
  private level: Level;
  private bag: BagItem[];

  constructor(level: Level) {
    this.level = level;
    this.position = level.getPlayerPosition();
    this.bag = [];
    this.chips = 0;
  }

  create(game: Phaser.Game) {
    this.sprite = game.add.sprite(Player.getPosition(this.position).x, Player.getPosition(this.position).y, 'chips', 130);
    this.sprite.anchor.set(0.5, 0.5);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.sprite.animations.add(Player.ANIMATION_LEFT, [101, 102, 103, 104, 105, 104, 103, 102], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add(Player.ANIMATION_RIGHT, [133, 134, 135, 136, 137, 136, 135, 134], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add(Player.ANIMATION_UP, [96, 97, 98, 99, 100, 99, 98, 97], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add(Player.ANIMATION_DOWN, [128, 129, 130, 131, 132, 131, 130, 129], Phaser.Timer.SECOND * 4 / TIME, true);

    game.camera.follow(this.sprite);
  }

  update(game: Phaser.Game) {
    if (this.leftKey.justDown) {
      this.pressedKeys.push(this.leftKey);
    } else if (this.rightKey.justDown) {
      this.pressedKeys.push(this.rightKey);
    }
    if (this.upKey.justDown) {
      this.pressedKeys.push(this.upKey);
    } else if (this.downKey.justDown) {
      this.pressedKeys.push(this.downKey);
    }

    if (this.pressedKeys.length && !this.isProcessing) {
      const key = this.pressedKeys[0];
      if (key === this.leftKey) {
        if (this.isCellAccessible(new PIXI.Point(this.position.x - 1, this.position.y))) {
          this.runAnimation(game, Player.ANIMATION_LEFT, -1, 0);
        } else {
          this.runBlocked(game, Player.ANIMATION_LEFT, this.leftKey);
        }
      } else if (key === this.rightKey) {
        if (this.isCellAccessible(new PIXI.Point(this.position.x + 1, this.position.y))) {
          this.runAnimation(game, Player.ANIMATION_RIGHT, 1, 0);
        } else {
          this.runBlocked(game, Player.ANIMATION_RIGHT, this.rightKey);
        }

      } else if (key === this.upKey) {
        if (this.isCellAccessible(new PIXI.Point(this.position.x, this.position.y - 1))) {
          this.runAnimation(game, Player.ANIMATION_UP, 0, -1);
        } else {
          this.runBlocked(game, Player.ANIMATION_UP, this.upKey);
        }
      } else if (key === this.downKey) {
        if (this.isCellAccessible(new PIXI.Point(this.position.x, this.position.y + 1))) {
          this.runAnimation(game, Player.ANIMATION_DOWN, 0, 1);
        } else {
          this.runBlocked(game, Player.ANIMATION_DOWN, this.downKey);
        }
      }
    }
  }

  private runAnimation(game: Phaser.Game, animationName: string, gapX: number, gapY: number) {
    this.isProcessing = true;
    if (this.sprite.animations.currentAnim !== this.sprite.animations.getAnimation(animationName)) {
      this.sprite.animations.play(animationName);
    }
    const newPosition = new PIXI.Point(this.position.x + gapX, this.position.y + gapY);
    game.add.tween(this.sprite).to({
      x: Player.getPosition(newPosition).x,
      y: Player.getPosition(newPosition).y
    }, TIME, Phaser.Easing.Default, true);
    game.time.events.add(TIME, () => {
      this.isProcessing = false;
      this.level.act(this, newPosition);
      this.pressedKeys.shift();
      this.position.x += gapX;
      this.position.y += gapY;
      this.sprite.x = Player.getPosition(this.position).x;
      this.sprite.y = Player.getPosition(this.position).y;
      if (!this.pressedKeys.length) {
        this.sprite.animations.stop();
        this.sprite.animations.currentAnim = null;
        if (animationName === Player.ANIMATION_LEFT) {
          this.sprite.frame = 103;
        } else if (animationName === Player.ANIMATION_RIGHT) {
          this.sprite.frame = 135;
        } else if (animationName === Player.ANIMATION_UP) {
          this.sprite.frame = 98;
        } else if (animationName === Player.ANIMATION_DOWN) {
          this.sprite.frame = 130;
        }
      }
    }, this)
  }

  private runBlocked(game: Phaser.Game, animationName: string, key: Phaser.Key) {
    this.sprite.animations.stop();
    this.sprite.animations.currentAnim = null;
    if (animationName === Player.ANIMATION_LEFT) {
      this.sprite.frame = 113;
    } else if (animationName === Player.ANIMATION_RIGHT) {
      this.sprite.frame = 145;
    } else if (animationName === Player.ANIMATION_UP) {
      this.sprite.frame = 108;
    } else if (animationName === Player.ANIMATION_DOWN) {
      this.sprite.frame = 140;
    }
    this.isProcessing = true;
    game.time.events.add(BLOCKTIME / 2, () => {
      if (animationName === Player.ANIMATION_LEFT) {
        this.sprite.frame = 103;
      } else if (animationName === Player.ANIMATION_RIGHT) {
        this.sprite.frame = 135;
      } else if (animationName === Player.ANIMATION_UP) {
        this.sprite.frame = 98;
      } else if (animationName === Player.ANIMATION_DOWN) {
        this.sprite.frame = 130;
      }
    });
    game.time.events.add(BLOCKTIME, () => {
      this.isProcessing = false;
      while (this.pressedKeys.length && this.pressedKeys[0] === key) {
        this.pressedKeys.shift();
      }
    })
  }

  static getPosition(point: PIXI.Point) {
    return new PIXI.Point((point.x + 0.5) * TILE_SIZE, (point.y + 0.5) * TILE_SIZE);
  }

  render(game: Phaser.Game) {
    //game.debug.cameraInfo(game.camera, 0, 10);
  }

  private isCellAccessible(point: PIXI.Point) {
    if (point.x < 0) {
      return false;
    }
    if (point.x >= GROUND_SIZE) {
      return false;
    }
    if (point.y < 0) {
      return false;
    }
    if (point.y >= GROUND_SIZE) {
      return false;
    }
    return this.level.isCellAccessible(this, point);
  }

  hasKey(color: COLOR) {
    console.log('has key ', color, '?');
    console.log(this.getKeyIndex(color));
    return this.getKeyIndex(color) >= 0;
  }

  addItem(bagItemKey: BagItemKey) {
    this.bag.push(bagItemKey);
  }

  removeKey(color: COLOR) {
    if (!this.hasKey(color)) {
      console.log('OOPS');
    }
    const index = this.getKeyIndex(color);
    this.bag.splice(index, 1);
  }

  getKeyIndex(color: COLOR) {
    for (let i = 0; i < this.bag.length; i++) {
      const bagItem = this.bag[i];
      console.log(bagItem, color);
      if (bagItem instanceof BagItemKey && bagItem.getColor() === color) {
        console.log('ok !');
        return i;
      }
    }

    return -1;
  }

  addChip() {
    this.chips++;
  }

  getChips(): number {
    return this.chips;
  }

  canExit() {
    return this.chips >= this.level.getChipsNeeded();
  }
}
