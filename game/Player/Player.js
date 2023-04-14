/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Player extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("costume1", "./Player/costumes/costume1.svg", {
        x: 8.85526315789474,
        y: 9.333333333333343
      }),
      new Costume("costume2", "./Player/costumes/costume2.svg", {
        x: 10.750000000000028,
        y: 13.144285714285758
      })
    ]

    this.sounds = [new Sound("pop", "./Player/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage2
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4),
      new Trigger(
        Trigger.BROADCAST,
        { name: "bombStart" },
        this.whenIReceiveBombstart
      ),
      new Trigger(Trigger.BROADCAST, { name: "loss" }, this.whenIReceiveLoss),
      new Trigger(
        Trigger.BROADCAST,
        { name: "restart" },
        this.whenIReceiveRestart
      )
    ]
  }

  *whenGreenFlagClicked() {
    this.costume = "costume1"
    this.stage.vars.moveManner = 0
    this.goto(-231, 171)
    this.visible = false
  }

  *whenIReceiveMessage1() {
    this.visible = true
  }

  *move2() {
    if (this.keyPressed("w") || this.keyPressed("up arrow")) {
      this.y += 5
      if (this.touching(Color.rgb(60, 33, 23))) {
        this.y -= 5
      }
    }
    if (this.keyPressed("a") || this.keyPressed("left arrow")) {
      this.x -= 5
      if (this.touching(Color.rgb(60, 33, 23))) {
        this.x += 5
      }
    }
    if (this.keyPressed("s") || this.keyPressed("down arrow")) {
      this.y -= 5
      if (this.touching(Color.rgb(60, 33, 23))) {
        this.y += 5
      }
    }
    if (this.keyPressed("d") || this.keyPressed("right arrow")) {
      this.x += 5
      if (this.touching(Color.rgb(60, 33, 23))) {
        this.x -= 5
      }
    }
  }

  *whenIReceiveMessage2() {
    while (true) {
      if (
        (this.touching(Color.rgb(154, 100, 255)) ||
          this.touching(Color.rgb(255, 0, 0))) &&
        this.toNumber(this.stage.vars.canmove) === 1
      ) {
        this.costume = "costume2"
        this.stage.vars.loss = 1
        this.broadcast("loss")
      }
      yield
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.toNumber(this.stage.vars.canmove) === 0) {
        this.costume = "costume2"
      } else {
        this.costume = "costume1"
      }
      yield
    }
  }

  *whenGreenFlagClicked3() {
    this.direction = 90
    while (true) {
      this.stage.vars.playerY = this.y
      this.stage.vars.playerX = this.x
      yield
    }
  }

  *esdfMove() {
    if (this.keyPressed("e")) {
      this.y += 5
      if (this.touching(Color.rgb(60, 33, 23))) {
        this.y -= 5
      }
    }
    if (this.keyPressed("s")) {
      this.x -= 5
      if (this.touching(Color.rgb(60, 33, 23))) {
        this.x += 5
      }
    }
    if (this.keyPressed("d")) {
      this.y -= 5
      if (this.touching(Color.rgb(60, 33, 23))) {
        this.y += 5
      }
    }
    if (this.keyPressed("f")) {
      this.x += 5
      if (this.touching(Color.rgb(60, 33, 23))) {
        this.x -= 5
      }
    }
  }

  *whenGreenFlagClicked4() {
    while (true) {
      if (this.toNumber(this.stage.vars.canmove) === 1) {
        if (this.toNumber(this.stage.vars.moveManner) === 1) {
          yield* this.esdfMove()
          this.broadcast("esdf")
        } else {
          yield* this.move2()
          this.broadcast("wasd/arrow")
        }
      }
      yield
    }
  }

  *whenIReceiveBombstart() {
    this.stage.vars.canmove = 0
    this.costume = "costume2"
  }

  *whenIReceiveLoss() {
    this.stage.vars.canmove = 0
  }

  *whenIReceiveRestart() {
    this.costume = "costume1"
    this.goto(-231, 171)
  }
}
