import {COLOR} from "./Ground";

export class BagItem {

}

export class BagItemKey extends BagItem {
  private color: COLOR;

  constructor(color: COLOR) {
    super();

    this.color = color;
  }

  public getColor(): COLOR {
    return this.color;
  }
}