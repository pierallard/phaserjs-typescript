import {Cell} from "./Cell";
import {TIME} from "../game_state/Play";
import {Level} from "../levels/Level";
import {GameObject} from "../game_objects/GameObject";
import Point from "../Point";
import Game = Phaser.Game;
import Player from "../Player";

export class Teleport extends Cell {
  constructor(game: Phaser.Game, x: number, y: number, groundGroup: Phaser.Group, level: Level) {
    super(game, x, y, groundGroup);

    this.sprite.animations.add('DEFAULT', [43, 44, 45], Phaser.Timer.SECOND * 3 / TIME, true);
    this.sprite.animations.play('DEFAULT');
  }

  animateEnd(game: Game, level: Level, actor: GameObject, endPosition: Point) {
    const destination = this.getDestination(level, actor);
    actor.teleportTo(destination.getPosition());
  }

  forceCell(player: Player): Point {
    return this.position.addSens(player.getSens());
  }

  private getDestination(level: Level, actor: GameObject): Teleport {
    let x = this.position.x - 1;
    let y = this.position.y;
    while (!(
      level.getCellAt(new Point(x, y)) instanceof Teleport &&
      level.canPlayerMoveTo(actor, new Point(x, y), (new Point(x, y)).addSens(actor.getSens()))
    )) {
      x = x - 1;
      if (x < 0) {
        x = 31;
        y--;
        if (y < 0) {
          y = 31;
        }
      }
    }

    return <Teleport> level.getCellAt(new Point(x, y));
  }
}