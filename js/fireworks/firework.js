
function Firework() {

  this.particles = []
  this.firework = new Particle(width/2, height, false, magnitude=random(4,12))
  this.firework.level = 1

  this.update = function() {

    this.firework.update()
    if (!this.firework.boomed) {
      if (this.firework.velocity.y >= 0) {
        this.firework.boomed = true;
        this.explode()
      }
    } else {
      for (let i = this.particles.length - 1; i >= 0 ; i--) {
        this.particles[i].update()
        if (this.particles[i].lifespan < 0) {
          this.particles.splice(i, 1)
        }
      }
    }
  }

  this.explode = function() {
    if (this.firework.level > 1) {
      this.firework.numparticles = 10 / this.firework.level
    } else {
      this.firework.numparticles = random(this.firework.strokeweight * 20, this.firework.strokeweight * 50)
    }
    let moreexplosions = random() < .1;
    let morecolors = random() < .2;
    let p;

    for (let i = 0; i < this.firework.numparticles; i++) {
      if (moreexplosions && this.firework.level < 3) {
        p = new Firework();
        p.firework.level = this.firework.level + 1;
        if (random() < .2) {
          p.firework.strokeweight = 6;
          p.firework.level = 2
        } else {
          p.firework.strokeweight = random(.5,2);
        }
        p.firework.position.x = this.firework.position.x;
        p.firework.position.y = this.firework.position.y;
        p.firework.velocity = p5.Vector.random2D();
        p.firework.velocity.mult(random(2,6));
        p.firework.lifespan = 128;
        if (morecolors) {
          p.firework.hue = (this.firework.hue * 3) % 360
          p.firework.saturation = 100
        } else {
          p.firework.hue = this.firework.hue;
          p.firework.saturation = this.firework.saturation / 1.5;
        }

      } else {
        p = new Particle(this.firework.position.x, this.firework.position.y, true, this.firework.numparticles / 100);
        p.gravity.mult(.3);
        p.strokeweight = random(1,2);
        if (morecolors) {
          if (random() < .3) {
            p.hue = (random(90, 180) + this.firework.hue) % 360;
            p.saturation = 70
          } else {
            p.hue = p.hue = this.firework.hue
          }
        }
        else {
          p.hue = random(this.firework.hue - 20, this.firework.hue + 20)
        }
      }
      this.particles.push(p);
    }
  }

  this.show = function() {

    if (!this.firework.boomed) {
      this.firework.show()
    }
    else {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].show()
      }
    }
  }

}
