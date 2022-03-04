const GRAVITATIONAL_CONST = 0.00000001;
const SCALING = 100; // 1 Pixel = 100km

class Ball {
  constructor (radius, mass, location, velocity, acceleration) {
    this.mass = mass;
    this.radius = radius;
    this.location = location; // Ort
    this.velocity = velocity; // Geschwindigkeit
    this.acceleration = acceleration; // Beschleunigung
  }

  update () {
    let dt = 1;
    this.velocity.add(p5.Vector.mult(this.acceleration, 0.5*dt));
    this.location.add(p5.Vector.mult(this.velocity, dt));
    this.velocity.add(p5.Vector.mult(this.acceleration, 0.5*dt));
  }

  display () {
    // Speichere die aktuelle Situation des Canvas. Damit bleiben alle Objekte,
    // wo sie sind. Wir kümmern uns dann nur um den aktuellen Körper.
    push(); 
    // Bewege den Ursprung des Koordinatensystems an die location.
    translate(this.location);
    // Erzeuge eine Kugel mit gegebenen Radius.
    sphere(2*this.radius);
    // Hole die gespeicherte Konfiguration des Canvas, inklusive der anderen 
    // Körper, wieder aus dem Speicher. Auch der Koordinatenursprung ist nun
    // wieder dort, wo er vorher war.
    pop();
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
let gravity = new Gravity(GRAVITATIONAL_CONST);

function setup() {
  createCanvas(1200, 800, WEBGL); // Hier wird das Canvas durch WEBGL 3D.
  
  // Der große Ball wird in die Mitte gesetzt.
  let bigball = new Ball(
    6378/SCALING, // Radius der Erde: 6378 km
    5972, // Masse der Erde 5,9722 * 10^24 kg
    createVector(0, 0, 0),
    createVector(0, 0, 0),
    createVector(0, 0, 0)
  );
  balls.push(bigball);
  
  // Zwei kleinere Bälle werden mit teilweise zufälligen Werten erzeugt.
  for (let i=0; i<2; i++) {
    let ball = new Ball(
      1737/SCALING, // Radius Erdenmond
      73.46, // Masse Mond 7,346 * 10^22 kg
      createVector(random(0, width/2), random(0, height/2), 0),
      createVector(random(-5, 5), random(-5, 5), 0),
      createVector(0, 0, 0)
    );
    balls.push(ball);
  }
}

function draw() {
  background(0);
  orbitControl(); // Zoomen und draggen aktivieren.
  normalMaterial(); // Aussehend der Körper.

  balls.forEach(element => {
    element.display();
    gravity.superposition(element, balls);
    element.update();
  });
}
