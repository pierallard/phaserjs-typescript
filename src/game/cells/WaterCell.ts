import {TIME} from "../game_state/Play";
import Player from "../Player";
import {Level} from "../levels/Level";
import Point from "../Point";
import EmptyCell from "./EmptyCell";
import {Cell} from "./Cell";
import Group = Phaser.Group;
import Game = Phaser.Game;
import {WaterBoots} from "../game_objects/PickableObject";

export class WaterCell extends Cell {
  private static WATER_ANIMATION: number[] = [24, 25, 26];
  private static DIRTY = 23;

  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Group) {
    super(game, x, y, groundGroup);

    this.sprite.frame = WaterCell.WATER_ANIMATION[0];
    this.sprite.animations.add('DEFAULT', WaterCell.WATER_ANIMATION, Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }

  isWater() {
    return (WaterCell.WATER_ANIMATION.indexOf(<number> this.sprite.frame) !== -1);
  }

  animatePlayerEnd(game: Game, level: Level, player: Player, endPosition: Point) {
    if (this.sprite.frame === WaterCell.DIRTY) {
      this.sprite.frame = EmptyCell.EMPTY_CELL;
    } else if (this.isWater()) {
      if (!player.has(WaterBoots)) {
        level.animateWaterAt(game, endPosition);
      }
    }
  }

  isDead(player: Player) {
    if (player.has(WaterBoots)) {
      return false;
    }

    if (WaterCell.WATER_ANIMATION.indexOf(<number> this.sprite.frame) !== -1) {
      return true;
    }

    return false;
  }

  canPackGoTo(player: Player) {
    if (this.sprite.frame === WaterCell.DIRTY) {
      return false;
    }
    return super.canPackGoTo(player);
  }

  changeAfterPack() {
    this.sprite.animations.stop('DEFAULT');
    this.sprite.frame = WaterCell.DIRTY;
  }
}