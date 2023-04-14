/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 367.25,
        y: 252.47823
      }),
      new Costume("backdrop2", "./Stage/costumes/backdrop2.svg", {
        x: 328.5,
        y: 261.31156
      }),
      new Costume("backdrop3", "./Stage/costumes/backdrop3.svg", {
        x: 277,
        y: 197
      })
    ]

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "loss" }, this.whenIReceiveLoss),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      )
    ]

    this.vars.groung = 1
    this.vars.loss = 0
    this.vars.score = 9
    this.vars.highestScore = 314
    this.vars.playerX = -211
    this.vars.playerY = 6
    this.vars.moveManner = 0
    this.vars.disappear = 0
    this.vars.secondhighest = 314
    this.vars.thirdhighest = 313
    this.vars.music = 1
    this.vars.canmove = 1

    this.watchers.score = new Watcher({
      label: "score",
      style: "large",
      visible: true,
      value: () => this.vars.score,
      x: 670,
      y: -156
    })
    this.watchers.highestScore = new Watcher({
      label: "highest score",
      style: "large",
      visible: false,
      value: () => this.vars.highestScore,
      x: 422,
      y: 35
    })
    this.watchers.secondhighest = new Watcher({
      label: "secondHighest",
      style: "large",
      visible: false,
      value: () => this.vars.secondhighest,
      x: 422,
      y: 11
    })
    this.watchers.thirdhighest = new Watcher({
      label: "thirdHighest",
      style: "large",
      visible: false,
      value: () => this.vars.thirdhighest,
      x: 422,
      y: -13
    })
  }

  *whenIReceiveLoss() {
    this.costume = "backdrop3"
    if (this.compare(this.vars.score, this.vars.highestScore) > 0) {
      this.vars.thirdhighest = this.vars.secondhighest
      yield* this.wait(0.01)
      this.vars.secondhighest = this.vars.highestScore
      yield* this.wait(0.01)
      this.vars.highestScore = this.vars.score
    } else {
      if (this.compare(this.vars.score, this.vars.secondhighest) > 0) {
        this.vars.thirdhighest = this.vars.secondhighest
        yield* this.wait(0.01)
        this.vars.secondhighest = this.vars.score
      } else {
        if (this.compare(this.vars.score, this.vars.thirdhighest) > 0) {
          this.vars.thirdhighest = this.vars.score
        }
      }
    }
  }

  *whenGreenFlagClicked() {
    this.costume = "backdrop1"
  }

  *whenIReceiveMessage1() {
    this.costume = "backdrop2"
  }
}
