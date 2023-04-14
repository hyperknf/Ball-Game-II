/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Sprite2 extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("costume1", "./Sprite2/costumes/costume1.svg", {
        x: 73.75,
        y: 24.25
      }),
      new Costume("costume2", "./Sprite2/costumes/costume2.svg", {
        x: 68.0699462890625,
        y: 21.25
      })
    ]

    this.sounds = [new Sound("pop", "./Sprite2/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      )
    ]
  }

  *whenthisspriteclicked() {
    this.stage.vars.disappear = 1
    this.costume = "costume2"
    this.visible = true
  }

  *whenGreenFlagClicked() {
    this.visible = true
    while (true) {
      if (this.toNumber(this.stage.vars.disappear) === 1) {
        this.costume = "costume2"
      } else {
        this.costume = "costume1"
      }
      yield
    }
  }

  *whenIReceiveMessage1() {
    if (this.toNumber(this.stage.vars.disappear) === 1) {
      this.visible = true
    } else {
      this.visible = false
    }
  }
}
