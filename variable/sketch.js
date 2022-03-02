// Anlegen einer globalen Zählvariablen x und zuweisen des Wertes 0.
let x = 0;

function setup() { 
  createCanvas(400, 400);
}

function draw() {
  background("lightblue");
  // Ausgabe der Zählvariablen x.
  text(x.toString(), width/2, height/2);
  // Eins zu Variablen dazuaddieren und den neuen Wert zuweisen.
  x = x +1;
}
