import {SENS} from "./Sens";

export default class Point extends PIXI.Point {
  equals(point: Point) {
    return this.x === point.x && this.y === point.y;
  }

  add(point: Point) {
    return new Point(this.x + point.x, this.y + point.y);
  }

  remove(point: Point) {
    return new Point(this.x - point.x, this.y - point.y);
  }

  left() {
    return this.add(new Point(-1, 0));
  }

  right() {
    return this.add(new Point(1, 0));
  }

  up() {
    return this.add(new Point(0, -1));
  }

  down() {
    return this.add(new Point(0, 1));
  }

  addSens(sens: SENS): Point {
    switch(sens) {
      case SENS.LEFT: return this.left();
      case SENS.RIGHT: return this.right();
      case SENS.UP: return this.up();
      case SENS.DOWN: return this.down();
    }
  }

  addReverseSens(sens: SENS) {
    switch(sens) {
      case SENS.LEFT: return this.right();
      case SENS.RIGHT: return this.left();
      case SENS.UP: return this.down();
      case SENS.DOWN: return this.up();
    }
  }
}
