// Anlegen einer globalen Variablen ypos, der y-Koordinate der Schneeflocke,
// und zuweisen des Wertes 0.
let ypos = 0;

function setup() { 
  createCanvas(400, 400);
}

function draw() {
  background("lightblue");
  
  // Zeichnen der Flocke als weißen Sternchen-Text der Größe 36.
  fill("white");
  textSize(36);
  // Die y-location wird mit der Variablen gesetzt.
  text("*", width/2, ypos);
  
  
  // Prüfe, ob die y-location kleiner als die Höhe der Zeichenfläche ist.
  // Falls ja, führe den Befehl in der if-Schleife aus.
  if (ypos < height) {
    // Die Variable wird um eins erhöht. Damit fällt die Flocke herunter.
    ypos = ypos+1;
  }
}
