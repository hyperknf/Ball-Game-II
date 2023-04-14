/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Sun extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("costume1", "./Sun/costumes/costume1.svg", {
        x: 1532.515005,
        y: 3104.2988
      }),
      new Costume("costume2", "./Sun/costumes/costume2.svg", {
        x: 1905.8205605705698,
        y: 3800.569819819819
      })
    ]

    this.sounds = [new Sound("pop", "./Sun/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "bombStart" },
        this.whenIReceiveBombstart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "bombEnd" },
        this.whenIReceiveBombend
      )
    ]
  }

  *whenGreenFlagClicked() {
    yield* this.init()
    while (!(this.compare(this.stage.vars.score, 300) > 0)) {
      yield* this.init()
      yield
    }
    while (!this.touching(Color.rgb(60, 33, 23))) {
      if (this.compare(this.stage.vars.score, 300) > 0) {
        if (this.toNumber(this.stage.vars.loss) === 0) {
          this.y -= 1
        } else {
          this.visible = false
        }
      }
      yield
    }
    yield* this.end()
  }

  *init() {
    this.stage.vars.loss = 0
    this.y = 300
    this.size = 12
    this.costume = "costume1"
    this.effects.ghost = 0
    this.visible = true
  }

  *whenIReceiveBombstart() {
    while (!(this.toNumber(this.stage.vars.loss) === 1)) {
      this.effects.ghost += 1
      yield
    }
  }

  *whenIReceiveBombend() {
    this.stage.vars.loss = 1
    this.broadcast("loss")
    this.visible = false
    yield* this.init()
  }

  *end() {
    this.costume = "costume2"
    this.y -= 100
    this.size = 100
    this.broadcast("bombStart")
    yield* this.wait(2)
    this.broadcast("bombEnd")
  }
}
