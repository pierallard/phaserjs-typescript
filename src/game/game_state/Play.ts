export default class Play extends Phaser.State {
    private bitMapText;

    constructor() {
        super();
    }

    public create(game: Phaser.Game) {
      this.bitMapText = game.add.bitmapText(100,100, 'font', 'Sample text', 7);
      const graphics = game.add.graphics(100, 150);
      graphics.lineStyle(2, 0xffff00);
      graphics.drawRect(0, 0, 50, 50);
      game.add.image(100, 250, 'chips', 0);
      const sprite = game.add.sprite(100, 300, 'chips', 1);
      sprite.animations.add('animationName', [1, 2, 3, 4], 4, true);
      sprite.animations.play('animationName');
    }

    public update(game: Phaser.Game) {
        this.bitMapText.x += 0.5;
        if (this.bitMapText.x > 500) {
            this.bitMapText.x = 100;
        }
    }
}
