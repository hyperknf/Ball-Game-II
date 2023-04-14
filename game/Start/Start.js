/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Start extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("costume1", "./Start/costumes/costume1.svg", {
        x: 39.60000000000005,
        y: 28.571428571428584
      }),
      new Costume("costume2", "./Start/costumes/costume2.svg", {
        x: 39.60000000000005,
        y: 28.571428571428612
      })
    ]

    this.sounds = [new Sound("pop", "./Start/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ]
  }

  *whenthisspriteclicked() {
    this.broadcast("message1")
    this.stage.vars.groung = 1
    this.broadcast("boostSetup")
    this.visible = false
  }

  *whenGreenFlagClicked() {
    this.visible = true
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.touching("mouse")) {
        this.costume = "costume2"
      } else {
        this.costume = "costume1"
      }
      yield
    }
  }
}
