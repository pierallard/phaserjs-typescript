export default class Preload extends Phaser.State {
    public preload () {
        this.loadAudio();
        this.loadImages();
        this.loadFonts();
    }

    public create () {
        this.game.state.start('Play');
    }

    private loadAudio() {
    }

    private loadImages() {
        this.game.load.spritesheet('chips', 'assets/images/chips.png', 12, 12)
    }

    private loadFonts() {
        this.game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');
    }
}
