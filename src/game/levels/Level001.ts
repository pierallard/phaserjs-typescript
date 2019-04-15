import {Level} from "./Level";

export default class Level001 extends Level {

  constructor() {
    super();

    this.map = [
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '          XXXXX XXXXX           ',
      '          X   XXX   X           ',
      '          X c XEX c X           ',
      '        XXXXXGXDXGXXXXX         ',
      '        X y B     R y X         ',
      '        X c Xb   rX c X         ',
      '        XXXXXc P cXXXXX         ',
      '        X c Xb   rX c X         ',
      '        X   R  c  B   X         ',
      '        XXXXXXYXYXXXXXX         ',
      '            X  X  X             ',
      '            X cXc X             ',
      '            X  Xg X             ',
      '            XXXXXXX             '
    ];

    this.chipsNeeded = 11;
  }
}
