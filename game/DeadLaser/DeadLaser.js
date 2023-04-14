/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js"

export default class DeadLaser extends Sprite {
  constructor(...args) {
    super(...args)

    this.costumes = [
      new Costume("1", "./DeadLaser/costumes/1.svg", {
        x: 11.5,
        y: 185.99999999999991
      }),
      new Costume("2", "./DeadLaser/costumes/2.svg", {
        x: 11.5,
        y: 185.99999999999994
      }),
      new Costume("4", "./DeadLaser/costumes/4.svg", { x: 11.5, y: 186 }),
      new Costume("5", "./DeadLaser/costumes/5.svg", { x: 11.5, y: 186 }),
      new Costume("6", "./DeadLaser/costumes/6.svg", { x: 11.5, y: 186 }),
      new Costume("7", "./DeadLaser/costumes/7.svg", {
        x: 60.4178440898589,
        y: 75.5
      }),
      new Costume("8", "./DeadLaser/costumes/8.svg", { x: 11.5, y: 186 }),
      new Costume("10", "./DeadLaser/costumes/10.svg", { x: 58.5, y: 232 }),
      new Costume("11", "./DeadLaser/costumes/11.svg", { x: 63, y: 206 }),
      new Costume("12", "./DeadLaser/costumes/12.svg", { x: 63, y: 206 }),
      new Costume("13", "./DeadLaser/costumes/13.svg", { x: 63, y: 206 }),
      new Costume("14", "./DeadLaser/costumes/14.svg", { x: 63, y: 206 }),
      new Costume("9", "./DeadLaser/costumes/9.svg", { x: 11.5, y: 186 }),
      new Costume("3", "./DeadLaser/costumes/3.svg", {
        x: 11.5,
        y: 185.99999999999994
      }),
      new Costume("15", "./DeadLaser/costumes/15.svg", {
        x: 61.41785237569994,
        y: 171.5
      }),
      new Costume("16", "./DeadLaser/costumes/16.svg", {
        x: 59.417850661540996,
        y: -26.5
      }),
      new Costume("17", "./DeadLaser/costumes/17.svg", { x: 50.5, y: 173 }),
      new Costume("18", "./DeadLaser/costumes/18.svg", {
        x: 57,
        y: 169.029025
      }),
      new Costume("19", "./DeadLaser/costumes/19.svg", { x: 25.5, y: 171.5 }),
      new Costume("20", "./DeadLaser/costumes/20.svg", { x: 25.5, y: 171.5 })
    ]

    this.sounds = [new Sound("pop", "./DeadLaser/sounds/pop.wav")]

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ]
  }

  *whenGreenFlagClicked() {
    this.visible = false
    this.goto(287, 54)
  }

  *whenGreenFlagClicked2() {
    if (this.toNumber(this.stage.vars.loss) === 1) {
      this.visible = false
    }
  }

  *whenIReceiveMessage1() {
    while (!(this.toNumber(this.stage.vars.loss) === 1)) {
      if (this.toNumber(this.stage.vars.canmove) === 1) {
        yield* this.wait(3.38)
        this.visible = true
        this.costume = this.random(1, 20)
        this.createClone()
        this.visible = false
      }
      yield
    }
  }

  *startAsClone() {
    while (
      !(
        this.compare(this.x, -222) < 0 ||
        this.touching(this.sprites["Troll"].andClones())
      )
    ) {
      if (this.toNumber(this.stage.vars.canmove) === 1) {
        this.x += -6.666 + this.toNumber(this.stage.vars.score) / -45
      } else {
        this.visible = false
      }
      yield
    }
    this.deleteThisClone()
  }

  *whenGreenFlagClicked3() {
    while (true) {
      if (this.toNumber(this.stage.vars.loss) === 1) {
        this.deleteThisClone()
      }
      yield
    }
  }
}
