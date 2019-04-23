import {BLOCKTIME, TILE_SIZE, TIME} from "./game_state/Play";
import {COLOR, Level, GROUND_SIZE} from "./levels/Level";
import Point from "./Point";
import {SENS} from "./Sens";
import {PickableObject, Key, Chip} from "./game_objects/PickableObject";
import Game = Phaser.Game;
import {GameObject} from "./game_objects/GameObject";
import Group = Phaser.Group;
import IceCell from "./cells/IceCell";
import {ForceBottomCell, ForceLeftCell, ForceRightCell, ForceTopCell} from "./cells/ForceCell";

enum MOVES {
  FORCED,
  NORMAL
}

export default class Player extends GameObject {
  private chips: number;
  private dead: boolean = false;

  private readonly leftKey: Phaser.Key;
  private readonly rightKey: Phaser.Key;
  private readonly upKey: Phaser.Key;
  private readonly downKey: Phaser.Key;
  private readonly pressedKeys: Phaser.Key[] = [];

  private lastMove: MOVES = null;
  private isProcessing: boolean = false;
  private level: Level;
  private bag: PickableObject[];

  constructor(game: Game, level: Level, objectGroup: Group) {
    super(game, level.getPlayerPosition().x, level.getPlayerPosition().y, objectGroup);
    this.level = level;
    this.bag = [];
    this.chips = 0;
    this.sens = SENS.DOWN;
    this.position = this.level.getPlayerPosition();
    this.pressedKeys = [];
    this.isProcessing = false;
    this.sprite = game.add.sprite(Player.getPosition(this.position).x, Player.getPosition(this.position).y, 'chips', 130);
    this.sprite.anchor.set(0.5, 0.5);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.sprite.animations.add(SENS.LEFT, [101, 102, 103, 104, 105, 104, 103, 102], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add(SENS.RIGHT, [133, 134, 135, 136, 137, 136, 135, 134], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add(SENS.UP, [96, 97, 98, 99, 100, 99, 98, 97], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add(SENS.DOWN, [128, 129, 130, 131, 132, 131, 130, 129], Phaser.Timer.SECOND * 4 / TIME, true);
    this.sprite.animations.add('DEFAULT', [130]);

    game.camera.follow(this.sprite);
  }

  update(game: Phaser.Game, level: Level) {
    if (this.dead) {
      return;
    }

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

    if (this.isProcessing) {
      return;
    }

    const pressedKey = this.pressedKeys.length > 0;
    const isForceCell = this.level.getCellAt(this.position) instanceof ForceBottomCell ||
      this.level.getCellAt(this.position) instanceof ForceRightCell ||
      this.level.getCellAt(this.position) instanceof ForceLeftCell ||
      this.level.getCellAt(this.position) instanceof ForceTopCell;
    const isIceCell = this.level.getCellAt(this.position) instanceof IceCell;

    if (isIceCell || isForceCell && this.lastMove === MOVES.NORMAL || isForceCell && this.lastMove === MOVES.FORCED && !pressedKey) {
      this.animeByForce(game);
    } else if (pressedKey) {
      this.animeByKey(game);
    }
  }

  private runAnimation(game: Phaser.Game, newPosition: Point, removeKey: boolean = true, speed: number = TIME) {
    this.isProcessing = true;
    this.level.animatePlayerBegin(game, this, newPosition);
    const animation = this.computeSens(this.position, newPosition);
    if (this.sprite.animations.currentAnim !== this.sprite.animations.getAnimation(animation + '')) {
      this.sprite.animations.play(animation + '');
    }
    this.sens = this.computeSens(this.position, newPosition);
    game.add.tween(this.sprite).to({
      x: Player.getPosition(newPosition).x,
      y: Player.getPosition(newPosition).y
    }, speed - Phaser.Timer.SECOND / 30, Phaser.Easing.Default, true);
    game.time.events.add(speed, () => {
      this.isProcessing = false;
      if (removeKey) {
        this.pressedKeys.shift();
      }
      this.position = newPosition;
      this.sprite.x = Player.getPosition(this.position).x;
      this.sprite.y = Player.getPosition(this.position).y;
      this.level.animateEnd(game, this, newPosition);
      if (!this.pressedKeys.length) {
        this.sprite.animations.stop();
        this.sprite.animations.currentAnim = null;
        if (animation === SENS.LEFT) {
          this.sprite.frame = 103;
        } else if (animation === SENS.RIGHT) {
          this.sprite.frame = 135;
        } else if (animation === SENS.UP) {
          this.sprite.frame = 98;
        } else if (animation === SENS.DOWN) {
          this.sprite.frame = 130;
        }
      }
    }, this)
  }

  private computeSens(begin: Point, end: Point): SENS {
    if (begin.x < end.x) {
      return SENS.RIGHT;
    } else if (begin.x > end.x) {
      return SENS.LEFT;
    } else if (begin.y < end.y) {
      return SENS.DOWN;
    } else {
      return SENS.UP;
    }
  }

  private runBlocked(game: Phaser.Game, sens: SENS, key: Phaser.Key) {
    this.sprite.animations.stop();
    this.sprite.animations.currentAnim = null;
    if (sens === SENS.LEFT) {
      this.sprite.frame = 113;
    } else if (sens === SENS.RIGHT) {
      this.sprite.frame = 145;
    } else if (sens === SENS.UP) {
      this.sprite.frame = 108;
    } else if (sens === SENS.DOWN) {
      this.sprite.frame = 140;
    }

    this.isProcessing = true;
    game.time.events.add(BLOCKTIME / 2, () => {
      this.level.animatePush(game, this, this.position.addSens(sens));
      if (sens === SENS.LEFT) {
        this.sprite.frame = 103;
      } else if (sens === SENS.RIGHT) {
        this.sprite.frame = 135;
      } else if (sens === SENS.UP) {
        this.sprite.frame = 98;
      } else if (sens === SENS.DOWN) {
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

  private static getPosition(point: PIXI.Point) {
    return new PIXI.Point((point.x + 0.5) * TILE_SIZE, (point.y + 0.5) * TILE_SIZE);
  }

  render(game: Phaser.Game) {
    game.debug.text(this.getPosition().x + ',' + this.getPosition().y, 0, 10);
  }

  private canMoveTo(point: Point) {
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
    return this.level.canPlayerMoveTo(this, this.position, point);
  }

  hasKey(color: COLOR) {
    return this.getKeyIndex(color) >= 0;
  }

  addItem(bagItemKey: PickableObject) {
    if (bagItemKey instanceof Chip) {
      this.addChip();
    } else {
      this.bag.push(bagItemKey);
    }
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
      if (bagItem instanceof Key && bagItem.getColor() === color) {
        return i;
      }
    }

    return -1;
  }

  private addChip() {
    this.chips++;
  }

  getChips(): number {
    return this.chips;
  }

  canExit() {
    return this.chips >= this.level.getChipsNeeded();
  }

  getPosition(): Point {
    return this.position;
  }

  destroy() {
    this.sprite.destroy(true);
  }

  has(klass): boolean {
    return this.bag.filter((b: PickableObject) => {
      return b instanceof klass;
    }).length > 0;
  }

  canPlayerGoTo(player: GameObject, endPosition: PIXI.Point, level: Level): boolean {
    return false; // TODO Heritage from GameObject
  }

  canPackGoTo(player: GameObject, endPosition: Point, level: Level): boolean {
    return false; // TODO Heritage from GameObject
  }

  animateEnd(game: Game, level: Level, actor: GameObject, endPosition: Point) {
    // TODO Heritage from GameObject
  }

  animatePlayerBegin(game: Game, level: Level, player: Player, endPosition: Point) {
    // TODO Heritage from GameObject
  }

  isToxic(): boolean {
    return false; // TODO Heritage from GameObject
  }

  teleportTo(destination: Point) {
    super.teleportTo(destination);
    this.sprite.x = Player.getPosition(this.position).x;
    this.sprite.y = Player.getPosition(this.position).y;
  }

  removeAllItems() {
    this.bag = [];
  }

  private animeByKey(game: Game) {
    const key = this.pressedKeys[0];
    this.lastMove = MOVES.NORMAL;
    if (key === this.leftKey) {
      if (this.canMoveTo(this.position.left())) {
        this.runAnimation(game, this.position.left());
      } else {
        this.runBlocked(game, SENS.LEFT, this.leftKey);
      }
    } else if (key === this.rightKey) {
      if (this.canMoveTo(this.position.right())) {
        this.runAnimation(game, this.position.right());
      } else {
        this.runBlocked(game, SENS.RIGHT, this.rightKey);
      }

    } else if (key === this.upKey) {
      if (this.canMoveTo(this.position.up())) {
        this.runAnimation(game, this.position.up());
      } else {
        this.runBlocked(game, SENS.UP, this.upKey);
      }
    } else if (key === this.downKey) {
      if (this.canMoveTo(this.position.down())) {
        this.runAnimation(game, this.position.down());
      } else {
        this.runBlocked(game, SENS.DOWN, this.downKey);
      }
    }
  }

  private animeByForce(game) {
    this.lastMove = MOVES.FORCED;
    const forceCell = this.level.getCellAt(this.position).forceCell(this);
    this.runAnimation(game, forceCell, false, TIME / 2);
  }
}
