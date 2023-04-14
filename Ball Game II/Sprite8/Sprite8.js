/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Sprite8 extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("costume1", "./Sprite8/costumes/costume1.svg", {
        x: 204.66789849138274,
        y: 24.395114754078634
      }),
      new Costume("costume2", "./Sprite8/costumes/costume2.svg", {
        x: 204.66789849138274,
        y: 24.39511975407862
      })
    ]

    this.sounds = [new Sound("pop", "./Sprite8/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "loss" }, this.whenIReceiveLoss),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked)
    ]
  }

  *whenIReceiveLoss() {
    this.visible = false
  }

  *whenGreenFlagClicked() {
    this.costume = "costume1"
    this.visible = true
  }

  *whenthisspriteclicked() {
    this.stopAllSounds()
    if (this.toNumber(this.stage.vars.music) === 1) {
      this.stage.vars.music = 2
      this.costume = "costume2"
    } else {
      this.stage.vars.music = 1
      this.costume = "costume1"
    }
  }
}
