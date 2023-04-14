/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Instruction extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("costume1", "./Instruction/costumes/costume1.svg", {
        x: 191.50634148520945,
        y: 14.481249999999989
      }),
      new Costume("costume2", "./Instruction/costumes/costume2.svg", {
        x: 79.7386995849609,
        y: 14.25
      })
    ]

    this.sounds = [new Sound("pop", "./Instruction/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      )
    ]
  }

  *whenGreenFlagClicked() {
    this.visible = true
    while (true) {
      if (this.toNumber(this.stage.vars.moveManner) === 1) {
        this.costume = "costume2"
      } else {
        this.costume = "costume1"
      }
      yield
    }
  }

  *whenIReceiveMessage1() {
    this.visible = false
  }
}
