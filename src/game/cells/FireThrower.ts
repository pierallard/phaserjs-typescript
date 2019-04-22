import {Cell} from "./Cell";
import {TILE_SIZE} from "../game_state/Play";
import Player from "../Player";
import Game = Phaser.Game;
import {Level} from "../levels/Level";
import FireBall from "../game_objects/FireBall";
import {SENS} from "../Sens";

export class FireThrower extends Cell {
  private fireSprite: Phaser.Sprite;
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = 65;
    this.fireSprite = game.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'chips', 179, groundGroup);
  }

  canPlayerGoTo(player: Player) {
    return false;
  }

  activate(game: Game, level: Level) {
    level.addObject(
      new FireBall(game, this.position.x, this.position.y, level.getObjectGroup(), SENS.LEFT)
    );
  }
}