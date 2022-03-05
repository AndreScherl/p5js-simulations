// Dieser Code verwendet schon existierenden Code und ist damit ein perfektes
// Beispiel dafür, wie sinnvoll es ist, das Rad nicht neu zu erfinden.
// In den Dateien findest du u.a.:
// - matter.js, das ist die Library für die Physics Engine
// - die Dateien BlockCore.js und Block.js, welche die benötigten Klassen enthalten
// - die Einbindung der Dateien in der index.html

let blockA;
let blockB;
let ground;

function setup() {
  createCanvas(800, 600);

  // Es wird einer physics engine erstellt und in die Variable engine geschrieben.
  let engine = Matter.Engine.create();
  // Mit der physics enigne wird eine Welt erstellt und in der Variablen world gespeichert.
  let world = engine.world;

  // Es werden mehrere Blöcke erstellt. Zwei sind beweglich und der dritte ist statisch,
  // denn er soll der schräge Boden sein.
  blockA = new Block(world, { x: 200, y: 200, w: 80, h: 80, color: 'white' });
  blockB = new Block(world, { x: 270, y: 50, w: 160, h: 80, color: 'white' });
  ground = new Block(world, { x: 400, y: 500, w: 810, h: 15, color: 'grey' }, { isStatic: true, angle: PI/36 });

  // Nun wird die Physics Engine, d.h. die Simualtion, gestartet.
  Matter.Runner.run(engine);
}

// In der draw-Methode müssen wir zum Zeichnen nicht mehr tun, als die gleichnamige Methode
// der Blöcke aufzurufen. Die ganze Arbeit steckt schon in den Klassen, die wir eingebunden haben.
function draw() {
  background('black');
  blockA.draw();
  blockB.draw();
  ground.draw();
}
