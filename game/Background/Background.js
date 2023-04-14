/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Background extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("background", "./Background/costumes/background.svg", {
        x: 0,
        y: 0
      })
    ]

    this.sounds = [
      new Sound("pop", "./Background/sounds/pop.wav"),
      new Sound("Rick Astley", "./Background/sounds/Rick Astley.wav"),
      new Sound(
        "MozartSeason-Greensleeves",
        "./Background/sounds/MozartSeason-Greensleeves.mp3"
      )
    ]

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.BROADCAST, { name: "loss" }, this.whenIReceiveLoss),
      new Trigger(
        Trigger.BROADCAST,
        { name: "restart" },
        this.whenIReceiveRestart
      )
    ]
  }

  *whenIReceiveMessage1() {
    this.stage.vars.canmove = 1
    this.stage.watchers.highestScore.visible = false
    this.stage.watchers.secondhighest.visible = false
    this.stage.watchers.thirdhighest.visible = false
    this.stage.watchers.score.visible = true
    while (!(this.toNumber(this.stage.vars.loss) === 1)) {
      if (this.toNumber(this.stage.vars.canmove) === 1) {
        yield* this.wait(1)
        this.stage.vars.score++
        this.sprites["ScoreEffect"].createClone()
      }
      yield
    }
    this.stage.costume = "backdrop3"
    this.stopAllSounds()
    yield* this.playSoundUntilDone("Rick Astley")
  }

  *whenGreenFlagClicked() {
    this.stage.vars.music = 1
    this.stage.vars.loss = 0
    this.stage.watchers.highestScore.visible = true
    this.stage.watchers.secondhighest.visible = true
    this.stage.watchers.thirdhighest.visible = true
    this.stage.watchers.score.visible = false
    this.stage.vars.score = 0
  }

  *whenGreenFlagClicked2() {
    this.audioEffects.volume = 100
    while (true) {
      if (
        this.toNumber(this.stage.vars.loss) === 1 &&
        this.toNumber(this.stage.vars.canmove) === 1
      ) this.broadcast("loss")
      if (
        (this.toNumber(this.stage.vars.canmove) === 0 &&
          this.toNumber(this.stage.vars.groung) === 1) ||
        this.toNumber(this.stage.vars.music) === 2
      ) {
        yield* this.playSoundUntilDone("Rick Astley")
      } else {
        yield* this.playSoundUntilDone("MozartSeason-Greensleeves")
      }
      yield
    }
  }

  *whenIReceiveLoss() {
    this.stopAllSounds()
    yield* this.playSoundUntilDone("Rick Astley")
  }

  *whenIReceiveRestart() {
    this.stopAllSounds()
    this.stage.vars.canmove = 1
    this.stage.vars.loss = 0
    this.stage.vars.music = 1
    this.broadcast("message1")
    this.stage.vars.score = 0
    this.stage.vars.groung = 1
    this.broadcast("boostSetup")
  }
}
