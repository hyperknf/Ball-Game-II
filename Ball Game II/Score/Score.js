/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Score extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("costume1", "./Score/costumes/costume1.svg", {
        x: 55.453163888925275,
        y: 22.96666860372153
      })
    ]

    this.sounds = [new Sound("pop", "./Score/sounds/pop.wav")]

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked)
    ]
  }

  *whenIReceiveMessage1() {
    this.visible = false
  }

  *whenGreenFlagClicked() {
    this.visible = true
  }

  *whenthisspriteclicked() {
    this.stage.vars.disappear = 0
  }
}
