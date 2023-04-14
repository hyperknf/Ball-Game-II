/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Troll extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("costume1", "./Troll/costumes/costume1.svg", { x: 5, y: 5 })
    ]

    this.sounds = [new Sound("pop", "./Troll/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      ),
      new Trigger(Trigger.BROADCAST, { name: "loss" }, this.whenIReceiveLoss)
    ]
  }

  *whenGreenFlagClicked() {
    this.goto(-235, -93)
    this.visible = false
  }

  *whenIReceiveMessage1() {
    this.visible = true
  }

  *whenIReceiveLoss() {
    this.visible = false
  }
}
