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
  }, {
    map: [
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '        AAAAAAAAAAAAAAAAA       ',
      '        A               A       ',
      '        A               A       ',
      '        AACAACXXXXXCAAAAA       ',
      '        Ac H  X   X  J cA       ',
      '        Ac H  X   C  J cA       ',
      '        Ac H  C P X  J cA       ',
      '        Ac H  X   X  J cA       ',
      '        AAAAAAXXDXXAAAAAA       ',
      '               XEX              ',
      '               XXX'
    ],
    chips: 4,
    actions: [],
  }, {
    map: [
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '            XXXXXXXXXXXXXX      ',
      '            X244444444444X      ',
      '         XXXX2XXXXXXXXXX8X      ',
      '         X6c624c4444444X8X      ',
      '         X8XXKXXXXXXXX8X8X      ',
      '         X8X    X  L F8X8X      ',
      '         X8X P  Xw X F8X8X      ',
      '         X8X    X  X F8X8X      ',
      '         X8X   MXM X F8X8X      ',
      '         X8XXXXXXXXXXXXX8X      ',
      '         X8W X MXM NNX668X      ',
      '         X8W X  X  DEX8XXX      ',
      '         X8W X fXKXXXX8X        ',
      '         X8W L  X   c 8X        ',
      '         XXXXXXXXXXXXXXX        '
    ],
    chips: 3,
    actions: []
  }, {
    map: [
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '            XXXXXXXXXXXXXX      ',
      '            X244444444444X      ',
      '         XXXX2XXXXXXXXXX8X      ',
      '         X6c624c4444444X8X      ',
      '         X8XXKXXXXXXXX8X8X      ',
      '         X8X    X  L F8X8X      ',
      '         X8X P  Xw X F8X8X      ',
      '         X8X    X  X F8X8X      ',
      '         X8X   MXM X F8X8X      ',
      '         X8XXXXXXXXXXXXX8X      ',
      '         X8W X MXM NNX668X      ',
      '         X8W X  X  DEX8XXX      ',
      '         X8W X fXKXXXX8X        ',
      '         X8W L  X   c 8X        ',
      '         XXXXXXXXXXXXXXX        '
    ],
    chips: 3,
    actions: []
  }, {
    map: [
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      '                                ',
      'XXXXXXXXXXXXXXXXXXXXX           ',
      'XXXXXXXXXXXXXXXXXXXXX           ',
      'XXOOOOOOOOOOOOOOOOOXX           ',
      'XXOOZZZZZZZZZZZZZOOXX           ',
      'XXOOZZZZZZZZZZZZZOOXX           ',
      'XXOOZZ         ZZOOXX           ',
      'XXOOZZ         ZZOOXX           ',
      'XXOOZZ         ZZOOXX           ',
      'XXOOZZ         ZZOOXX           ',
      'XPOOZZ   dc    ZZOODE           ',
      'XXOOZZ         ZZOOXX           ',
      'XXOOZZ         ZZOOXX           ',
      'XXOOZZ         ZZOOXX           ',
      'XXOOZZ         ZZOOXX           ',
      'XXOOZZZZZZZZZZZZZOOXX           ',
      'XXOOZZZZZZZZZZZZZOOXX           ',
      'XXOOOOOOOOOOOOOOOOOXX           ',
      'XXXXXXXXXXXXXXXXXXXXX           ',
      'XXXXXXXXXXXXXXXXXXXXX           '
    ],
    actions: [],
    chips: 1,
  }, {
    map: [
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      'XXXOOOOOOOOOOOOXXXXXXXXXXXXEXXXX',
      'XXXO  a  a  a OXXXXXXXXXXXX XXXX',
      'XXXOacOOOOOOOOOXXXXXXXXXXX o   X',
      'X  O  a  a  a O D            & X',
      'X XOOOOOOOOOcaOXXXXXXXXXXX  j  X',
      'X XO a  a  a  OI9XX7III9XX  p  X',
      'X XOOOOOOOOOOOOXIXXIXXXIXX     X',
      'X XXXXX XXXXXXXXIXXIXbXIXXXXXXXX',
      'X XXXXX XXcXXXXX1II3X X1IIIII9XX',
      'X XXXXX XX XXXXXXXXXX XXXXXXXIXX',
      'X XXX   X   XXX      é      XIXX',
      'X XXX XXX X XXX XXXXX XXXXX XIXX',
      'X XXX  p p  XXX XyBQ   QGrX XIXX',
      'X X   p p   X X(XXXXX XXXXX&XIXX',
      'X X X XXXXXXX X XgYS   SRIIII3XX',
      'X X   zzzz zzUX XXXXX XXXXX XXXX',
      'X XXXXXXXX  c X      è      XXXX',
      'X     XXc  zz XXXXXXX XXXXXXXXXX',
      'X AAA XXXXXXXXXXrXXXXqXXXXXXXXXX',
      'X AcA XXXXXXXXXXIXXXX8XXXXXXXXXX',
      'X ACA XXXXXXXXXXIXXXX XXXXXXXXXX',
      'X     X 2XXXXXXXIXXXFIFFFFFFFFFX',
      'XXXXXXX 22XXXXXXIX RIIIIIIII IFX',
      'XP   cY 222X       XFII III IIFX',
      'XXX XXX 222A   p XXXFI I IIIIIFX',
      'X è   X 222A  p  XXXFII IIcII FX',
      'X     X 222C p p XXXF III IIIIFX',
      'X  y  X8444A     XXXFI IIII IIFX',
      'X     XXXXXXXXXXXXXXFIII III IFX',
      'X   é XXXXXXXXXXXXXXFIIII III FX',
      'XXXXXXXXXXXXXXXXXXXXFFFFFFFFFFFX'
    ],
    actions: [
      [[28, 5], [27, 3]]
    ],
    chips: 9,
  }
];
