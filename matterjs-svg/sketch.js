// Original von Benno Stäbler, Benedikt Groß

// In diesem Sketch wird ein SVG (Vektorgrafik) in einen Körper umgewandelt,
// der dann in der Physics Engine matterjs als statisches Hindernis fungiert.
// Dafür sind weitere Libraries von anderen Entwicklern nötig, z.B.
// - decomp.js
// - pathseq.js
// Die SVG kann im HTML eingebettet sein oder als Datei vorliegen. Hier ist
// es die Datei path.svg.


// Die Plugin matter-warp sorgt dafür das der Ball immer wieder in den Canvas gesetzt wird.
Matter.use('matter-wrap');

let ball;
let polygon;
let ground;

function setup() {
  createCanvas(700, 600);

  // Erstellen der Physics Engine und speichern ihrer Welt.
  const engine = Matter.Engine.create();
  const world = engine.world;

  // Hier wird er Körper aus dem SVG erstellt.
  polygon = new PolygonFromSVG(world,
    { x: 180, y: 300, fromFile: './path.svg', scale: 0.8, color: 'white' },
    { isStatic: true, friction: 0.0 }
  );

  // Objekte sollen im folgenden Bereich bleiben (ganzes Canvas).
  const wrap = {
    min: { x: 0, y: 0 },
    max: { x: width, y: height }
  };

  // Ball wird erzeugt.
  ball = new Ball(world,
    { x: 100, y: 50, r: 40, color: 'white' },
    { friction: 0.0, plugin: { wrap: wrap } }
  );

  // Boden wird erzeugt.
  ground = new Block(world,
    { x: 550, y: 500, w: 500, h: 25, color: 'grey' },
    { isStatic: true, angle: PI * -0.1 }
  );

  // Starten der Physics Engine.
  Matter.Runner.run(engine);
}

function draw() {
  background('black');

  ground.draw();
  polygon.draw();
  ball.draw();
}
