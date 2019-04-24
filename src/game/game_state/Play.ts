import {Level, GROUND_SIZE} from "../levels/Level";
import {PIXELS_WIDTH} from "../../app";
import Menu from "../Menu";
import ExitCell from "../cells/ExitCell";

export const TILE_SIZE = 12;
export const TIME = Phaser.Timer.SECOND / 4;
export const BLOCKTIME = TIME / 3;

export default class Play extends Phaser.State {
  private readonly level: Level;
  private readonly levelNumber: number;
  private menu: Menu;

  constructor(game: Phaser.Game, levelNumber: number = 14) {
    super();
    this.levelNumber = levelNumber;
    this.level = Level.getFromNumber(this.levelNumber);
    this.menu = new Menu(this.level);
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
    this.menu.create(game);
  }

  public update(game: Phaser.Game) {
    this.menu.update(game);
    this.level.update(game);
    if (this.hasFinished()) {
      this.state.add('Level' + (this.levelNumber + 1), new Play(game, this.levelNumber + 1));
      this.state.start('Level' + (this.levelNumber + 1));
    } else if (this.isDead()) {
      this.level.getPlayer().destroy();
      game.time.events.add(TIME * 3, () => {
        this.state.states[this.state.current] = new Play(game, this.levelNumber);
        this.state.restart(true);
      })
    }
  }

  public render(game: Phaser.Game) {
    this.level.getPlayer().render(game);
  }

  private hasFinished(): boolean {
    return this.level.getCellAt(this.level.getPlayer().getPosition()) instanceof ExitCell;
  }

  private isDead() {
    return this.level.getPlayer(true) === null;
  }
}
