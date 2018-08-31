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
    }

    private loadFonts() {
    }
}
