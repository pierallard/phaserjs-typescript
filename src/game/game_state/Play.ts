import Player from "../Player";
import {Level, GROUND_SIZE} from "../levels/Level";
import {PIXELS_WIDTH} from "../../app";
import Menu from "../Menu";

export const TILE_SIZE = 12;
export const TIME = Phaser.Timer.SECOND / 4;
export const BLOCKTIME = TIME / 1.5;

export default class Play extends Phaser.State {
  private player: Player;
  private level: Level;
  private menu: Menu;
  private levelNumber: number;

  constructor(game: Phaser.Game, levelNumber: number = 1) {
    super();
    this.levelNumber = levelNumber;
    this.level = Level.getFromNumber(this.levelNumber);
    this.player = new Player(this.level);
    this.menu = new Menu(this.level, this.player);
  }

  public create(game: Phaser.Game) {
    game.world.setBounds(0, 0, GROUND_SIZE * TILE_SIZE, GROUND_SIZE * TILE_SIZE);
    game.camera.width = PIXELS_WIDTH;
    const groundGroup = game.add.group(null, 'Ground');
    const objectGroup = game.add.group(null, 'Objects');
    const effectsGroup = game.add.group(null, 'Effects');
    game.add.existing(groundGroup);
    game.add.existing(objectGroup);
    game.add.existing(effectsGroup);
    this.level.create(game, groundGroup, objectGroup, effectsGroup);
    this.player.create(game);
    this.menu.create(game);
  }

  public update(game: Phaser.Game) {
    this.player.update(game);
    this.menu.update(game);
    this.level.update(game);
    if (this.hasFinished()) {
      this.state.add('Level' + (this.levelNumber + 1), new Play(game, this.levelNumber + 1));
      this.state.start('Level' + (this.levelNumber + 1));
    } else if (this.isDead()) {
      this.player.destroy();
      game.time.events.add(TIME * 3, () => {
        this.state.states[this.state.current] = new Play(game, this.levelNumber);
        this.state.restart(true);
      })
    }
  }

  public render(game: Phaser.Game) {
    this.player.render(game);
  }

  private hasFinished(): boolean {
    return (
      this.player.getPosition().equals(this.level.getEndPosition())
    );
  }

  private isDead() {
    const deadPositions = this.level.getDeadPositions();
    for (let i = 0; i < deadPositions.length; i++) {
      if (this.player.getPosition().equals(deadPositions[i])) {
        return true;
      }
    }

    return false;
  }
}
