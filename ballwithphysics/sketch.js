// Die Klasse für den Ball enthält alle wichtigen Eigenschaften (Attribute) und
// Methoden zum aktualisieren der Bewegungswerte sowie einer Methode, um sich 
// selbst zu zeichnen.
class Ball {
  constructor (mass, location, velocity, acceleration) {
    this.mass = mass;
    // Der Radius des Balls wird durch die Masse bestimmt, die mit dem Flächeninhalt
    // gleichgesetzt wird.
    this.radius = Math.sqrt(mass/Math.PI);
    this.location = location; // Ort
    this.velocity = velocity; // Geschwindigkeit
    this.acceleration = acceleration; // Beschleunigung
  }

  // Die update-Methode berechnet den nächsten Ort und die nächste Geschwindgkeit
  // des Balls.
  update () {
    let dt = 0.1; // Zeitintervall zwischen zwei Berechnungsschritten

    // Die Beschleunigung erhöht die Geschwindigkeit in einem Zeitintervall um 
    // einen gewissen Wert "Beschelunigung mal Zeitintervall = Geschwindigeitsänerung".
    // WICHTIG! Wir dürfen nicht mit dem Endwert der Geschwingkeitszunahme rechnen, um 
    // die Geschwindigkeit zu bestimmen, sondern müssen die Durchschnittsgeschwindigkeit
    // im Zeitintervall für die Berechnung des Ortes zugrunde legen. Diese finden wir in
    // der Mitte des Zeitintervalls. Also gehen wir zunächst nur bis zur Mitte 0.5*dt.
    this.velocity.add(p5.Vector.mult(this.acceleration, 0.5*dt));

    // Mit der eben berechneten Durchschnittsgeschwidnigkeit kommen wir auf den nächsten Ort.
    this.location.add(p5.Vector.mult(this.velocity, dt));
    
    // Nun bestimmen wir den Endwert der Geschdindigkeit, indem wir bis zum Ende des
    // Zeitintervalls gehen, also weitere 0.5*dt weiter.
    this.velocity.add(p5.Vector.mult(this.acceleration, 0.5*dt));

    // Wenn der Ball unten am Rand des Canvas ankommt, so er nach oben reflektiert werden.
    if (this.location.y > height) {
      this.velocity.y = this.velocity.y * (-1);
    }
    // Wenn der Ball links oder rechts an den Rand kommt, wird er ebendfalls refelktiert.
    if (this.location.x < 0 || this.location.x > width) {
      this.velocity.x = this.velocity.x * (-1);
    }
  }

  // Mit der display-Methode zeichnet sich der Ball.
  display () {
    circle(this.location.x, this.location.y, 2*this.radius);
  }
}

// Eine leere Liste von Bällen wird erzeugt.
let balls = new Array();

function setup() {
  createCanvas(400, 400);
  
  // Die for-Loop wird 3-mal durchlaufen und dabei jedes Mal ein neuer Ball erzeugt und
  // der Liste von Bällen hinzugefügt.
  for (let i=0; i<3; i++) {
    let ball = new Ball(
      random(100, 5000), 
      createVector(width/2, height/2),
      createVector(random(-10, 10), 0),
      createVector(0, 9.81)
    );
    balls.push(ball);
  }
}

function draw() {
  background(220);

  // Die Liste der Bälle wird durchlaufen und bei jedem Element die Methoden display()
  // und update() aufgerufen, um den Ball zu zeichnen und seine neuen Werte für 
  // Geschwindigkeit und Ort zu berechnen.
  balls.forEach(element => {
    element.display();
    element.update();
  });
}
