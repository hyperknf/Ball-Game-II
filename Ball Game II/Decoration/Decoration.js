/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Decoration extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("costume1", "./Decoration/costumes/costume1.svg", {
        x: 8.85526315789474,
        y: 9.333333333333343
      })
    ]

    this.sounds = [new Sound("pop", "./Decoration/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      )
    ]
  }

  *whenGreenFlagClicked() {
    this.visible = false
  }

  *whenGreenFlagClicked2() {
    this.stage.vars.groung = 0
    while (true) {
      if (this.toNumber(this.stage.vars.groung) === 0) {
        yield* this.wait(10)
        this.visible = true
        this.createClone()
        this.visible = false
      } else {
        this.visible = false
      }
      yield
    }
  }

  *startAsClone() {
    while (!this.touching("edge")) {
      this.x += 10
      yield
    }
    this.deleteThisClone()
  }

  *whenIReceiveMessage1() {
    this.visible = false
  }
}
