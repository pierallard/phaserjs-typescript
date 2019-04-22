interface LevelDescriptor {
  map: string[],
  chips: number,
  actions: number[][][]
}

export const LEVELS: LevelDescriptor[] = [
  {
    map: [
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
    ],
    chips: 11,
    actions: []
  },
  {
    map: [
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '         XXXXXXX                ',
      '         X  c  X                ',
      '         X     X                ',
      '         X  X  XXXXXXXXXX       ',
      '       XXX  Xa  WW     cX       ',
      '       XED  XXa WW ppP  X       ',
      '       XXX  Xa  WW     cX       ',
      '         X  X  XXXXXXXXXX       ',
      '         X     X                ',
      '         X  c  X                ',
      '         XXXXXXX                ',
    ],
    chips: 4,
    actions: []
  }, {
    map: [
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '               XXX              ',
      '               XEX              ',
      '           XXXXXDXXXX           ',
      '           X24444444X           ',
      '           X2XXXXXX8X           ',
      '        XXXX2XWWWWX8XXXX        ',
      '        X2444XWicWX8444X        ',
      '        X2XXXXWWWWXXXX8X        ',
      '        X2X7II    FFFX8X        ',
      '        X2XIfX    F5FX8X        ',
      '        X2XIcX P  FcFX8X        ',
      '        X2X1II  w FFFX8X        ',
      '        X2XXXX    XXXX8X        ',
      '        X66666888666668X        ',
      '        XXXXXX8c88XXXXXX        ',
      '             X8888X             ',
      '             XXXXXX             '
    ],
    chips: 4,
    actions: []
  }, {
    map: [
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '    XXXXXXXXX                   ',
      '    XX  T  cXXXXXXXXXXXXXX      ',
      '    Xt X XXXXX     X  S  X      ',
      '    XX     XXXDXXE X  X cX      ',
      '    XXXXXX tX   XXXX qXXXX      ',
      '    XX  T  XX P X  Q  X  X      ',
      '    Xt X XXXX   X  X  Q cX      ',
      '    XX            qXXXXXXX      ',
      '    XXXXXXXXXXX X  X  Q cX      ',
      '        X       X  S  X  X      ',
      '        X U U XXXXXX qXXXX      ',
      '        X  V  X    X  X cX      ',
      '        X U U X    X  S  X      ',
      '        X     X    XXXXXXX      ',
      '        XXXXXXX                 '
    ],
    chips: 9,
    actions: []
  }, {
    map: [
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '          XXXXXXXXXXX           ',
      '          XEz      PX           ',
      '          XXX  zzz  X           ',
      '            X   jzo X           ',
      '            X  zzz  X           ',
      '            X  zzz  X           ',
      '            X   jzo X           ',
      '            X  zzze X           ',
      '            XXRXXXXXXXX         ',
      '            X   q     X         ',
      '            X XXXXX X X         ',
      '            X   Sus X X         ',
      '            XXXXXXXXX X         ',
      '            XWrF      X         ',
      '            XW F  h   X         ',
      '            XW F    P X         ',
      '            X         X         ',
      '            XXXXXXXXXXX         '
    ],
    chips: 0,
    actions: [
      [[16, 8], [18, 8]],
      [[16, 11], [18, 11]],
      [[18, 16], [18, 19]]
    ]
  }
];
