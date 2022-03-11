/*
An Attempt to create my own SVG Engine for Animation Purposes.
Adapting from Chrigi Etters Input in CAS Coding for the Arts.
And looking into other frameworks (p5.js) how they work.

Started on March 11, 2022.
Never yet finished.
*/


//////// MAIN CLASS
class ngn {
  // what do we need here?
  constructor(parent = window) {

    this.parent = parent

    this.svg = {}
    this.dom = {}

  }

  // create svg element on dom element (if given).
  // otherwise create element on window.
  createStage() {

  }

  // we'll put requestAnimationFrame stuff in here i guess.
  draw() {

  }
}



///////// FUNCTIONS.
  // some generic and useful functions or shortcuts.
  // heavily influenced by p5.js
  // possibly will need to be modularized and moved elsewhere...

function random() {
  return Math.random()
}

function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function coinToss(chance) {
  if (random() <= chance / 100) {
    return true
  }
}

function map(val, minIn, maxIn, minOut, maxOut) {
  val = (val - minIn) / (maxIn - minIn)
  return minOut + val * (maxOut - minOut)
}

function dist(a, b) {
  let aa = a.x - b.x
  let bb = a.y - b.y
  return Math.round(Math.sqrt(aa * aa + bb *bb) * 100) / 100
}

function rad(degrees) {
  return degrees * (Math.PI / 180)
}

function deg(radians) {
  return radians / (Math.PI / 180)
}


/////////// ALGORITHMS

// noise

// verlet