// Wir verwenden ein Plugin für matterjs, um Anziehungskräfte zu simulieren.
// Dieses Plugin muss in matterjs eingebunden werden.
Matter.use(
  'matter-attractors' // PLUGIN_NAME
);
// Setzen der Gravitationskonstante.
MatterAttractors.Attractors.gravityConstant = 0.1;

// Eine leere Liste für die Körper erstellen.
let bodies = new Array();

function setup () {
  createCanvas(800, 600);

  // Die Physics Engine wird erstellt.
  let engine = Matter.Engine.create();
  // Keine Gravitation nach unten.
  engine.gravity.scale = 0;
  // Zeitdehnungsfaktor.
  engine.timing.timeScale = 1;

  // In die Welt werde die Körper hinzugefügt.
  let world = engine.world;

  // Die Klasse Ball findest du in den eingebundenen Dateien.
  // Zuerst wird der große Ball in der Mitte erzeugt.
  let bigBall = new Ball(
    world,
    {
      x: width/2,
      y: height/2,
      r: 60,
      color: 'blue'
    },
    {
      mass: 100,
      frictionAir: 0,
      // Das Plugin für die Anziehungskräfte zwischen Körpern wird
      // für diesen Körper aktiviert.
      plugin: {
        attractors: [
          MatterAttractors.Attractors.gravity
        ]
      },
      // Der große Ball soll sich nicht bewegen.
      isStatic: true
    }
  );
  bodies.push(bigBall);
  
  // Erzeuge ein paar (hier zwei) Körper und füge sie der Liste hinzu.
  for (let i=0; i<2; i++) {
    let ball = new Ball(
      world,
      {
        x: random(0, width/2),
        y: random(0, height/2),
        r: random(1, 10),
        color: 'grey',
      },
      {
        frictionAir: 0,
        plugin: {
          attractors: [
            MatterAttractors.Attractors.gravity
          ]
        }
      }
    );
    // Die Masse ist hier gleich dem Flächeninhalt.
    Matter.Body.setMass(ball, Math.PI * Math.pow(ball.radius, 2));
    
    // Matterjs kann keine Startgeschwindigkeit direkt setzen, also
    // wird der erste nächste Ort soweit verschoben, dass sich daraus
    // eine Geschwindigkeit ergibt.
    ball.body.position = {
      x: ball.body.position.x + random(2, 7), 
      y: ball.body.position.y + random(0, -2)
    };
    bodies.push(ball);
  }
  
  // Starte die Engine.
  Matter.Runner.run(engine);
}

function draw() {
  background('black');

  bodies.forEach(element => {
    element.draw();
  });
}
  