import {TIME} from "../game_state/Play";
import Player from "../Player";
import {Level} from "../levels/Level";
import Point from "../Point";
import {Cell} from "./Cell";
import Group = Phaser.Group;
import Game = Phaser.Game;

export class FireCell extends Cell {
  private static FIRE_ANIMATION: number[] = [32, 33, 34];

  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = FireCell.FIRE_ANIMATION[0];
    this.sprite.animations.add('DEFAULT', FireCell.FIRE_ANIMATION, Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }

  isDead(player: Player) {
    if (player.hasFireBoots()) {
      return false;
    }

    return true;
  }

  animateEnd(game: Game, player: Player, endPosition: Point, level: Level) {
    if (player.hasFireBoots()) {
      return;
    }

    level.animateFireAt(game, endPosition);
  }
}