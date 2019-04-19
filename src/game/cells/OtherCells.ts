import {TILE_SIZE} from "../game_state/Play";
import {BagItemKey} from "../BagItem";
import Player from "../Player";
import Point from "../Point";
import EmptyCell from "./EmptyCell";
import {COLOR} from "../levels/Level";
import Group = Phaser.Group;
import Game = Phaser.Game;

export class ChipCell extends EmptyCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 74;
  }

  animateEnd(game: Game, player: Player, endPosition: Point) {
    if (this.sprite.frame !== ChipCell.EMPTY_CELL) {
      this.sprite.frame = EmptyCell.EMPTY_CELL;
      player.addChip();
    }
  }
}

abstract class KeyCell extends EmptyCell {
  protected keySprite: Phaser.Sprite;
  protected color: COLOR;

  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.keySprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips');
  }

  animateEnd(game: Game, player: Player, endPosition: Point) {
    this.keySprite.destroy();

    player.addItem(new BagItemKey(this.color));
  }
}

export class BlueKeyCell extends KeyCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.color = COLOR.BLUE;
    this.keySprite.frame = 76;
  }
}

export class YellowKeyCell extends KeyCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.color = COLOR.YELLOW;
    this.keySprite.frame = 77;
  }
}

export class RedKeyCell extends KeyCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.color = COLOR.RED;
    this.keySprite.frame = 75;
  }
}

export class GreenKeyCell extends KeyCell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.color = COLOR.GREEN;
    this.keySprite.frame = 78;
  }
}


