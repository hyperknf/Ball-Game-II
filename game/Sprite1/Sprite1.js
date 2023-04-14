/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("1", "./Sprite1/costumes/1.svg", {
        x: 30.3594516120653,
        y: 26.5
      }),
      new Costume("2", "./Sprite1/costumes/2.svg", {
        x: 30.3594516120653,
        y: 26.5
      })
    ]

    this.sounds = [new Sound("pop", "./Sprite1/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "esdf" }, this.whenIReceiveEsdf),
      new Trigger(
        Trigger.BROADCAST,
        { name: "wasd/arrow" },
        this.whenIReceiveWasdArrow
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ]
  }

  *whenIReceiveEsdf() {
    this.costume = 2
  }

  *whenIReceiveWasdArrow() {
    this.costume = 1
  }

  *whenthisspriteclicked() {
    if (this.toNumber(this.stage.vars.moveManner) === 0) {
      this.stage.vars.moveManner++
      this.costume = 2
    } else {
      this.stage.vars.moveManner = 0
      this.costume = 1
    }
  }

  *whenIReceiveMessage1() {
    this.visible = false
  }

  *whenGreenFlagClicked() {
    if (this.toNumber(this.stage.vars.moveManner) === 0) {
      this.stage.vars.moveManner++
      this.costume = 2
    } else {
      this.stage.vars.moveManner = 0
      this.costume = 1
    }
    this.visible = true
  }
}
