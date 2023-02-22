// Récupération des éléments HTML
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var clearButton = document.getElementById("clear");
var playButton = document.getElementById("play");
var stopButton = document.getElementById("stop");
var colorPicker = document.getElementById("color");
var drawButton = document.getElementById("draw");
var circleButton = document.getElementById("circle");
const exportBtn = document.getElementById('exportBtn');

exportBtn.addEventListener('click', () => {
  const dataUrl = canvas.toDataURL();
  const link = document.createElement('a');
  link.download = 'export.png';
  link.href = dataUrl;
  link.click();
});
// Initialisation des variables
var frameCount = 0;
var isPlaying = false;
var frames = [];
var isDrawing = false;

// Ajout des événements
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
clearButton.addEventListener("click", clearCanvas);
playButton.addEventListener("click", playAnimation);
stopButton.addEventListener("click", stopAnimation);
drawButton.addEventListener("click", function() { isDrawing = true; });
circleButton.addEventListener("click", function() { drawCircle(200, 200, 50); });

// Fonction pour dessiner un cercle
function drawCircle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.strokeStyle = colorPicker.value;
  context.stroke();
  frames.push(canvas.toDataURL()); // Enregistrement de la frame
}

// Fonction pour démarrer le dessin
function startDrawing(e) {
  if (!isDrawing) {
    return;
  }
  context.beginPath();
  context.moveTo(e.offsetX, e.offsetY);
  canvas.addEventListener("mousemove", draw);
  frames.push(canvas.toDataURL()); // Enregistrement de la frame
}

// Fonction pour dessiner
function draw(e) {
  if (!isDrawing) {
    return;
  }
  context.lineTo(e.offsetX, e.offsetY);
  context.strokeStyle = colorPicker.value;
  context.stroke();
  frames.push(canvas.toDataURL()); // Enregistrement de la frame
}

// Fonction pour arrêter le dessin
function stopDrawing() {
  if (!isDrawing) {
    return;
  }
  canvas.removeEventListener("mousemove", draw);
  isDrawing = false;
}

// Fonction pour effacer le canvas
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  frames = [];
  frameCount = 0;
  isPlaying = false;
}

// Fonction pour jouer l'animation
function playAnimation() {
  if (frames.length === 0) {
    return;
  }
  isPlaying = true;
  frameCount = 0;
  drawFrame();
}

// Fonction pour arrêter l'animation
function stopAnimation() {
  isPlaying = false;
}

// Fonction pour dessiner une frame
function drawFrame() {
  if (!isPlaying) {
    return;
  }
  var img = new Image();
  img.onload = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0);
    frameCount++;
    if (frameCount === frames.length) {
      frameCount = 0;
    }
    setTimeout(drawFrame, 1000/24); // 24 fps
  };
  img.src = frames[frameCount];
}
