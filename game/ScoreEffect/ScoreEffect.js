/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class ScoreEffect extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("costume1", "./ScoreEffect/costumes/costume1.svg", {
        x: 16.081818181818193,
        y: 21.60647727272729
      })
    ]

    this.sounds = [new Sound("pop", "./ScoreEffect/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ]
  }

  *whenGreenFlagClicked() {
    this.visible = false
  }

  *startAsClone() {
    this.visible = true
    this.y += 3
    for (let i = 0; i < 101; i++) {
      yield* this.moveUp()
      yield* this.wait(0.01)
      yield
    }
    this.deleteThisClone()
  }

  *moveUp() {
    this.y += 1
    this.effects.ghost += 2
  }
}
