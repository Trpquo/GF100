"use strict"
function Particle(x, y, boom=false, magnitude=8) {

  this.position = createVector(x, y)
  this.acceleration = createVector(0, 0)
  this.gravity = createVector(0, .15)
  this.boomed = boom
  this.lifespan = 255
  this.saturation = 100

  if (boom) {
    this.velocity = p5.Vector.random2D()
    this.velocity.mult(random(2,7) * magnitude)
  } else {
    this.velocity = createVector(random(-3, 3), random(-10, -7))
    this.strokeweight = magnitude
    this.hue = random(30, 330)
  }

  this.applyForce = function(force) {
    this.acceleration.add(force)
  }

  this.update = function() {
    if (this.boomed) {
      this.velocity.mult(random(0.5, 1.2))
      this.lifespan -= random(10)
    }
    this.applyForce(this.gravity)
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  this.show = function() {
    strokeWeight(this.strokeweight)
    stroke(this.hue, this.saturation, 100, this.lifespan / 255)
    point(this.position.x, this.position.y)
  }

}
