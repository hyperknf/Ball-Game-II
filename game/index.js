import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js"

import Stage from "./Stage/Stage.js"
import Decoration from "./Decoration/Decoration.js"
import Start from "./Start/Start.js"
import Score from "./Score/Score.js"
import Player from "./Player/Player.js"
import Background from "./Background/Background.js"
import DeadLaser from "./DeadLaser/DeadLaser.js"
import Troll from "./Troll/Troll.js"
import Seed from "./Seed/Seed.js"

import Sprite1 from "./Sprite1/Sprite1.js"
import Sprite2 from "./Sprite2/Sprite2.js"
import Sprite3 from "./Sprite3/Sprite3.js"
import Sun from "./Sun/Sun.js"
import Sprite7 from "./Sprite7/Sprite7.js"
import Sprite8 from "./Sprite8/Sprite8.js"
import Instruction from "./Instruction/Instruction.js"
import Restart from "./Restart/Restart.js"
import ScoreEffect from "./ScoreEffect/ScoreEffect.js"

const stage = new Stage({ costumeNumber: 2 })

const sprites = {
  Decoration: new Decoration({
    x: -230,
    y: -92,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 10
  }),
  Start: new Start({
    x: 87,
    y: 14,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 14
  }),
  Score: new Score({
    x: -62.9999999364217,
    y: 36,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 11
  }),
  Player: new Player({
    x: -211,
    y: 6,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1
  }),
  Background: new Background({
    x: 36,
    y: 28,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2
  }),
  DeadLaser: new DeadLaser({
    x: 287,
    y: 54,
    direction: 90,
    costumeNumber: 8,
    size: 100,
    visible: false,
    layerOrder: 13
  }),
  Troll: new Troll({
    x: -235,
    y: -93,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 3
  }),
  Seed: new Seed({
    x: -216,
    y: 1,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 4
  }),
  Sprite1: new Sprite1({
    x: -206,
    y: 129,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 5
  }),
  Sprite2: new Sprite2({
    x: -164,
    y: 158,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 6
  }),
  Sprite3: new Sprite3({
    x: -235,
    y: -80,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 7
  }),
  Sun: new Sun({
    x: 15,
    y: 171,
    direction: 90,
    costumeNumber: 1,
    size: 12,
    visible: true,
    layerOrder: 8
  }),
  Sprite7: new Sprite7({
    x: -32,
    y: -12,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 12
  }),
  Sprite8: new Sprite8({
    x: -34,
    y: -184,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 9
  }),
  Instruction: new Instruction({
    x: 0,
    y: -70,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 15
  }),
  Restart: new Restart({
    x: -1,
    y: -89.56765272198699,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 16
  }),
  ScoreEffect: new ScoreEffect({
    x: 214,
    y: -171,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 17
  })
}

const project = new Project(stage, sprites, {
  frameRate: 60
})
export default project