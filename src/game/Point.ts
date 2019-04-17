export default class Point extends PIXI.Point {
  equals(point: Point) {
    return this.x === point.x && this.y === point.y;
  }
}