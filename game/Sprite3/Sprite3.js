/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Sprite3 extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("costume1", "./Sprite3/costumes/costume1.svg", {
        x: 4.886542500000047,
        y: 16.79156000000006
      })
    ]

    this.sounds = [new Sound("pop", "./Sprite3/sounds/pop.wav")]

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
    this.visible = false
  }

  *whenIReceiveMessage1() {
    this.visible = true
  }

  *whenIReceiveLoss() {
    this.visible = false
  }
}
