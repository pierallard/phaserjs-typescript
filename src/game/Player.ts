import Sprite = Phaser.Sprite;
import {TILE_SIZE, TIME} from "./game_state/Play";

export default class Player {
  private static ANIMATION_LEFT = 'LEFT';
  private static ANIMATION_RIGHT = 'RIGHT';
  private static ANIMATION_UP = 'UP';
  private static ANIMATION_DOWN = 'DOWN';
  private sprite: Sprite;
  private position: PIXI.Point;

  private leftKey: Phaser.Key;
  private rightKey: Phaser.Key;
  private upKey: Phaser.Key;
  private downKey: Phaser.Key;

  private pressedKeys: Phaser.Key[] = [];
  private isProcessing: boolean = false;

  constructor() {
    this.position = new PIXI.Point(1, 1);
  }

  create(game: Phaser.Game) {
    this.sprite = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, 'chips', 130);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.sprite.animations.add(Player.ANIMATION_LEFT, [101, 102, 103, 104, 105], Phaser.Timer.SECOND * 5 / TIME, false);
    this.sprite.animations.add(Player.ANIMATION_RIGHT, [133, 134, 135, 136, 137], Phaser.Timer.SECOND * 5 / TIME, true);
    this.sprite.animations.add(Player.ANIMATION_UP, [96, 97, 98, 99, 100], Phaser.Timer.SECOND * 5 / TIME, false);
    this.sprite.animations.add(Player.ANIMATION_DOWN, [128, 129, 130, 131, 132], Phaser.Timer.SECOND * 5 / TIME, false);
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
        this.runAnimation(game, Player.ANIMATION_LEFT, -1, 0);
      } else if (key === this.rightKey) {
        this.runAnimation(game, Player.ANIMATION_RIGHT, 1, 0);
      } else if (key === this.upKey) {
        this.runAnimation(game, Player.ANIMATION_UP, 0, -1);
      } else if (key === this.downKey) {
        this.runAnimation(game, Player.ANIMATION_DOWN, 0, 1);
      }
    }
  }

  private runAnimation(game: Phaser.Game, animationName: string, gapX: number, gapY: number) {
    this.isProcessing = true;
    this.sprite.animations.play(animationName);
    game.add.tween(this.sprite).to( {
      x: (this.position.x + gapX) * TILE_SIZE,
      y: (this.position.y + gapY) * TILE_SIZE
    }, TIME, Phaser.Easing.Default, true);
    game.time.events.add(TIME, () => {
      this.isProcessing = false;
      this.pressedKeys.shift();
      this.position.x += gapX;
      this.position.y += gapY;
      this.sprite.animations.stop();
      if (animationName === Player.ANIMATION_LEFT) {
        this.sprite.frame = 103;
      } else if (animationName === Player.ANIMATION_RIGHT) {
        this.sprite.frame = 135;
      } else if (animationName === Player.ANIMATION_UP) {
        this.sprite.frame = 98;
      } else if (animationName === Player.ANIMATION_DOWN) {
        this.sprite.frame = 130;
      }
    }, this)
  }
}