/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Seed extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("costume1", "./Seed/costumes/costume1.svg", { x: 9.5, y: 87 })
    ]

    this.sounds = [new Sound("pop", "./Seed/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "bombEnd" },
        this.whenIReceiveBombend
      )
    ]
  }

  *whenGreenFlagClicked() {
    this.visible = false
  }

  *startAsClone() {
    this.direction = this.radToScratch(
      Math.atan2(
        this.sprites["Player"].y - this.y,
        this.sprites["Player"].x - this.x
      )
    )
    yield* this.wait(4)
    yield* this.glide(
      1,
      this.toNumber(this.stage.vars.playerX),
      this.toNumber(this.stage.vars.playerY)
    )
    this.deleteThisClone()
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.toNumber(this.stage.vars.loss) === 1) this.visible = false
      yield
    }
  }

  *whenIReceiveMessage1() {
    while (true) {
      if (this.compare(this.stage.vars.score, 100) > 0) {
        yield* this.wait(5)
        this.visible = true
        this.goto(
          this.toNumber(this.stage.vars.playerX) + 20,
          this.toNumber(this.stage.vars.playerY)
        )
        this.createClone()
        this.goto(
          this.toNumber(this.stage.vars.playerX) - 20,
          this.toNumber(this.stage.vars.playerY)
        )
        this.createClone()
        this.goto(
          this.toNumber(this.stage.vars.playerX),
          this.toNumber(this.stage.vars.playerY) + 20
        )
        this.createClone()
        this.goto(
          this.toNumber(this.stage.vars.playerX),
          this.toNumber(this.stage.vars.playerY) - 20
        )
        this.createClone()
        this.visible = false
      }
      yield
    }
  }

  *whenIReceiveBombend() {
    this.deleteThisClone()
  }
}
