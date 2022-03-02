// Funktion wird nur einmal zu Beginn des Programms aufgerufen.
function setup() { 
  // Erstellt eine Zeichenebene der Größe 400 Pixel x 400 Pixel- 
  createCanvas(400, 400);
}

// Diese Funktion wird durchgehend wiederholt aufgerufen.
// Sobald sie durchgelaufen ist, startet sie erneut.
// Alle Inhalte werden neu gezeichnet und berechnet.
function draw() {
  // Setzte die Hintergrundfarbe.
  background("lightblue");

  // Es wird ein Text gezeichnet, der die Nummer es aktuellen
  // Frames ausgibt, also die Zahl des aktuell gezeichneten Bildes.
  // Diese Zahl entspricht der Anzahl der Durchläufe der draw-Funktion.
  text(frameCount.toString(), width/2, height/2);
}
