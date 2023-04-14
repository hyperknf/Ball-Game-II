/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Restart extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("1", "./Restart/costumes/1.svg", {
        x: 108.96987294124622,
        y: 28.878260101829852
      })
    ]

    this.sounds = [new Sound("pop", "./Restart/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "loss" }, this.whenIReceiveLoss),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked)
    ]
  }

  *whenGreenFlagClicked() {
    this.visible = false
  }

  *whenIReceiveLoss() {
    this.visible = true
  }

  *whenthisspriteclicked() {
    this.broadcast("restart")
    this.visible = false
  }
}
