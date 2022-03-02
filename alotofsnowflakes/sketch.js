// Da es viele Schneeflocken gibt, lohnt es sich eine Klasse dafür einzuführen.
// Die ist ein Bauplan für gleichartige Objekte.

// Jede Klasse beginnt mit dem Schlüsselwort class und ihrem Namen.
class Snowflake {
  // Der Konstruktor ist die Methode der Klasse, die bei der Erzeugung aufgerufen wird.
  // Bei der Erzeugung werden die Variablen der Klassen = Attribute gesetzt.
  constructor() {
    // ypos der Flocke ist 0, für alle Flocken.
    this.ypos = 0;
    // xpos ist eine Zufallszahl zwischen 0 und Breite des Canvas.
    this.xpos = int(random(0,width));
    // Die Fallgeschwindigkeit der Flocke ist eine Zufallszahl zwischen 0 und 5.
    this.speed = int(random(0,5));
  }

  // Die Methode lässt die Flocke fallen, erhöht dafür die ypos um die Geschwindigkeit.
  fall () {
    this.ypos = this.ypos + this.speed;
  }

  // Mit der Display-Methode zeichnet sich die Flocke auf den Canvas.
  display () {
    fill("white");
    textSize(36);
    text("*", this.xpos, this.ypos);
  }
}

// Wir erzeugen die globale Liste von Schneeflocken. Zunächst ist die Liste leer.
let snowflakes = new Array();

// Bei Start des Programms erzeugen wir 50 Schneeflocken und fügen sie der Liste hinzu.
function setup() { 
  createCanvas(400, 400);
  // Die for-Schleife ist eine Wiederholung.
  // Die Zählvariable i wird auf 0 gesetzt und dann nach jedem Durchlauf um 1 erhöht.
  // Das geht solange i kleiner als 50 ist.
  for (let i=0; i<50; i++) {
    // Eine neue Schneeflocke wird erzeugt und in die Liste gepusht.
    snowflakes.push(new Snowflake());
  }
}

function draw() {
  background("lightblue");
  
  // Wir gehen die Liste durch und führen für jedes Element der Liste die Anweisungen durch.
  snowflakes.forEach(element => {
    // Ist die ypos kleiner als die Höhe des Canvas, wird die Methode fall() der 
    // Flocke ausgeführt.
    if (element.ypos < height) {
      element.fall();
    }
    // Die Flocke wird über die update()-Methode (neu) gezeichnet.
    element.display();
  });
}
