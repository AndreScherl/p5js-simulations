class Ball {
  constructor (mass, location, velocity, acceleration) {
    this.mass = mass;
    this.radius = Math.sqrt(mass/Math.PI);
    this.location = location; // Ort
    this.velocity = velocity; // Geschwindigkeit
    this.acceleration = acceleration; // Beschleunigung
  }

  update () {
    let dt = 0.1;
    this.velocity.add(p5.Vector.mult(this.acceleration, 0.5*dt));
    this.location.add(p5.Vector.mult(this.velocity, dt));
    this.velocity.add(p5.Vector.mult(this.acceleration, 0.5*dt));
  }

  display () {
    circle(this.location.x, this.location.y, 2*this.radius);
  }
}

// Die Klasse Gravity kapselt die Berechnung der Gravitationskräfte zwischen Massen.
class Gravity {
  constructor(gconst) {
    this.gconst = gconst; // Gravitationskonstante (in Wirklichkeit: 6.67*10^-11)
  }

  // Berechnung der Gravitationskraft zwischen zwei Körpern.
  force_between(body1, body2) {
    let distance = p5.Vector.sub(body2.location, body1.location);
    let force = distance.div(distance.mag()).mult(this.gconst*body1.mass*body2.mass/distance.magSq());
    return force;
  }

  // Berechnung Beschleunigung aufgrund der Summe aller Graviationskräfte für einen Körper.
  superposition(body, bodies) {
    bodies.forEach(element => {
      if (body != element) {
        body.acceleration.add(this.force_between(body, element).div(body.mass));
      }
    });
  }
}

let balls = new Array();
// let gravity = new Gravity(6.67 * Math.pow(10, -11));
let gravity = new Gravity(0.0000001);

function setup() {
  createCanvas(600, 600);
  
  // Der große Ball wird in die Mitte gesetzt.
  let bigball = new Ball(
    10000,
    createVector(width/2, height/2),
    createVector(0, 0),
    createVector(0, 0)
  );
  balls.push(bigball);
  
  // Zwei kleinere Bälle werden mit zufälligen Werten erzeugt.
  for (let i=0; i<2; i++) {
    let ball = new Ball(
      random(50, 200), 
      createVector(random(0, width), random(0, height)),
      createVector(random(-5, 5), random(-5, 5)),
      createVector(0, 0)
    );
    balls.push(ball);
  }
}

function draw() {
  background(220);

  balls.forEach(element => {
    element.display();
    gravity.superposition(element, balls);
    element.update();
  });
}
