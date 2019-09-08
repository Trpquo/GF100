
var fireworks = [];

function setup() {
  let banner = document.querySelector("#banner")
  colorMode(HSB)
  c = createCanvas(windowWidth - 20, banner.offsetHeight + 50)
  c.id("fireworks")
  c.parent("banner")
  stroke(255)
  strokeWeight(4)


}
function draw() {
  background(200, 100, 30, .2)

  if (random() < .02) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0 ; i--) {
    fireworks[i].update()
    fireworks[i].show()
    if (fireworks[i].firework.lifespan < 0) {
      fireworks.splice(i, 1)
    }
  }


}
