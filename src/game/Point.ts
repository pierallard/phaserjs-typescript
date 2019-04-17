export default class Point extends PIXI.Point {
  equals(point: Point) {
    return this.x === point.x && this.y === point.y;
  }

  add(point: Point) {
    return new Point(
      this.x + point.x,
      this.y + point.y
    );
  }

  remove(point: Point) {
    return new Point(
      this.x - point.x,
      this.y - point.y
    );
  }
}