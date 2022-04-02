let rate = 0.4; //rate of pedal change 0.4
let hueyD = 1.1; //rate of color change 1.1
let fr = 30; //framerate 40
let chance = 0.1; //chance in 10 of reversal 0.3
let strokeW = 0.1; // how thick the lines are - try putting to 5
let array1 = [];
let newArray = [];
let paused = -1;
let x1D = rate,
  x2D = rate,
  a1xD = rate,
  a2xD = rate,
  a1yD = rate,
  a2yD = rate;
let huey,
  sat,
  brt,
  overlap,
  alph2,
  beziers,
  sym,
  layers,
  alph,
  strokeYN,
  ang,
  a1x,
  a1y,
  a2x,
  a2y,
  x1,
  x2,
  hSize,
  cush,
  petalSlider,
  layersSlider,
  alphaSlider,
  randomPetalButton,
  randomLayersButton,
  randomAlphaButton,
  outlineButton,
  noOutlineButton,
  randOutButton,
  curve1Button,
  curve2Button,
  randCurveButton,
  overlapButton,
  noOverlapButton,
  randOverlapButton,
  newArtButton,
  printButton,
  pauseButton;
let pRand = -1;
let lRand = -1;
let aRand = -1;
let cRand = true;
let randOverl = true;
let c1, c2;
function setup() {
  frameRate(fr);
  let size = min(1080, 1080);
  canvas = createCanvas(size, size);
  canvas.position(0, 0);
  hSize = size / 2;
  angleMode(DEGREES);
  translate(width / 2, height / 2);

  // create user interface
  let noPetals = createElement("noPetals", "Jumlah Kelopak");
  noPetals.position(40, 0);
  noPetals.style("color", "white");
  petalSlider = createSlider(4, 64, 32, 4);
  petalSlider.position(10, 20);
  let noLayers = createElement("noLayers", "Jumlah Layer");
  noLayers.position(175, 0);
  noLayers.style("color", "white");
  layersSlider = createSlider(4, 64, 32, 2);
  layersSlider.position(150, 20);
  let alpha = createElement("alpha", "alpha");
  alpha.position(330, 0);
  alphaSlider = createSlider(25, 100, 50);
  alphaSlider.position(290, 20);

  randomPetalsButton = createButton("Acak");
  randomPetalsButton.position(40, 45);
  randomPetalsButton.style("background-color", "blue");
  randomPetalsButton.style("color", "white");
  randomPetalsButton.style("border", 0);
  randomPetalsButton.style("border-radius", "3px");
  randomPetalsButton.style("padding-left", "15px");
  randomPetalsButton.style("padding-right", "15px");
  randomPetalsButton.mousePressed(petalsRandom);

  randomLayersButton = createButton("Acak");
  randomLayersButton.position(180, 45);
  randomLayersButton.style("background-color", "blue");
  randomLayersButton.style("color", "white");
  randomLayersButton.style("border", 0);
  randomLayersButton.style("border-radius", "3px");
  randomLayersButton.style("padding-left", "15px");
  randomLayersButton.style("padding-right", "15px");
  randomLayersButton.mousePressed(layersRandom);

  randomAlphaButton = createButton("Acak");
  randomAlphaButton.position(320, 45);
  randomAlphaButton.style("background-color", "blue");
  randomAlphaButton.style("color", "white");
  randomAlphaButton.style("border", 0);
  randomAlphaButton.style("border-radius", "3px");
  randomAlphaButton.style("padding-left", "15px");
  randomAlphaButton.style("padding-right", "15px");
  randomAlphaButton.mousePressed(alphaRandom);

  pauseButton = createButton("pause");
  pauseButton.position(10, 70);
  pauseButton.mousePressed(pause);

  newArtButton = createButton("new art");
  newArtButton.position(110, 70);
  newArtButton.style("background-color", "orange");
  newArtButton.style("color", "white");
  newArtButton.style("border", 0);
  newArtButton.style("border-radius", "3px");
  newArtButton.style("padding-left", "15px");
  newArtButton.style("padding-right", "15px");
  newArtButton.mousePressed(newArt);

  printButton = createButton("save jpg");
  printButton.position(250, 70);
  printButton.style("background-color", "lightgreen");
  printButton.style("color", "white");
  printButton.style("border", 0);
  printButton.style("border-radius", "3px");
  printButton.style("padding-left", "15px");
  printButton.style("padding-right", "15px");
  printButton.mousePressed(saveJpg);

  outlineButton = createButton("outline");
  outlineButton.position(430, 0);
  outlineButton.mousePressed(outline);
  noOutlineButton = createButton("no outline");
  noOutlineButton.position(500, 0);
  noOutlineButton.mousePressed(noOutline);
  randOutButton = createButton("Acak");
  randOutButton.position(580, 0);
  randOutButton.mousePressed(randOutline);
  randOutline();

  curve1Button = createButton("style 1");
  curve1Button.position(430, 30);
  curve1Button.mousePressed(curve1);
  curve2Button = createButton("style 2");
  curve2Button.position(505, 30);
  curve2Button.mousePressed(curve2);
  randCurveButton = createButton("Acak");
  randCurveButton.position(580, 30);
  randCurveButton.mousePressed(randCurve);
  randCurve();

  overlapButton = createButton("> overlap");
  overlapButton.position(430, 60);
  overlapButton.mousePressed(overlapYes);
  noOverlapButton = createButton("< overlap");
  noOverlapButton.position(505, 60);
  noOverlapButton.mousePressed(noOverlap);
  randOverlapButton = createButton("Acak");
  randOverlapButton.position(580, 60);
  randOverlapButton.mousePressed(randOverlap);
  randOverlap();

  colorMode(HSB, 360, 100, 100, 100);
  newArt();
}

function newArt() {
  array1 = [];
  newArray = [];
  background(0);
  // get variable values
  if (pRand == 1) {
    sym = petalSlider.value();
  } else {
    sym = Math.floor(Math.random() * 31) + 1;
  }
  ang = 360 / sym;
  if (lRand == 1) {
    layers = layersSlider.value();
  } else {
    layers = Math.floor(Math.random() * 31) + 1;
  }
  cush = (hSize / layers) * random(4, 12); // cushion between each layer
  if (aRand == 1) {
    alph2 = alphaSlider.value();
  } else {
    alph2 = random(25, 100);
  }
  if (strokeRand == 1) {
    strokeYN = round(random(1));
  }
  if (cRand == true) {
    beziers = round(random(1));
  }
  if (randOverlap == true) {
    overlap = round(random(1));
  }
  let outlineNote;
  if (strokeYN == 1) {
    outlineNote = "yes";
  } else {
    outlineNote = "no";
  }
  let overlapNote;
  if (overlap == 0) {
    overlapNote = "less";
  } else {
    overlapNote = "more";
  }
  // print('petals:',round(sym,1), '; layers:',round(layers,1),';alpha:',round(alph),';outline:',outlineNote,';style:',beziers+1,';overlap:',overlapNote)

  // calculate STARTING hues and points for each layer, starting with outside pedals and going inward, and save them plus directions to array
  for (let j = 0; j < layers; j++) {
    x1 = random(hSize * 0.75 - j * cush, hSize * 0.85 - j * cush);
    x2 = random(hSize * 0.9 - j * cush, hSize - j * cush);
    a1x = random(x1 * 1.2, x2 * 0.4);
    a2x = random(x2 * 0.5, x2 * 0.9);

    if (overlap == 0) {
      a1y = a1x * tan(ang);
      let maxa2x = a2x * tan(ang) * 0.9;
      a2y = random(maxa2x * 0.01, maxa2x);
    } else {
      a1y = random(20 / j, 245 - j * cush);
      a2y = random(20 / j, 245 - j * cush);
    }
    huey = random(256);
    sat = random(50, 100); //You could play
    brt = random(75, 100); //with these too.
    array1.push(
      x1,
      x1D,
      x2,
      x2D,
      a1x,
      a1xD,
      a2x,
      a2xD,
      a1y,
      a1yD,
      a2y,
      a2yD,
      huey,
      hueyD
    );
  }
}

function draw() {
  if (paused == -1) {
    newArray = [];
    push();
    if (aRand == 1) {
      alph = alphaSlider.value();
    } else {
      alph = alph2;
    }
    translate(width / 2, height / 2);
    background(
      Math.floor(Math.random() * 254) + 1,
      Math.floor(Math.random() * 0.9) + 0.1
    );

    // calculate points for each layer, starting with outside pedals and going inward
    for (let k = 0; k < layers; k++) {
      let Nx1 = array1[k * 14 + 0];
      let Nx1D = array1[k * 14 + 1];
      Nx1 = Nx1 + Nx1D;
      if (
        Nx1 < hSize * 0.75 - k ||
        Nx1 > hSize * 0.85 - k * cush ||
        random(10) < chance
      ) {
        Nx1D *= -1;
      }

      let Nx2 = array1[k * 14 + 2];
      let Nx2D = array1[k * 14 + 3];
      Nx2 = Nx2 + Nx2D;
      if (
        Nx2 < hSize * 0.9 - k * cush ||
        Nx2 > hSize - k * cush ||
        random(10) < chance
      ) {
        Nx2D *= -1;
      }

      let Na1x = array1[k * 14 + 4];
      let Na1xD = array1[k * 14 + 5];
      Na1x = Na1x + Na1xD;
      if (Na1x < Nx1 * 1.2 || Na1x > Nx2 * 0.4 || random(10) < chance) {
        Na1xD *= -1;
      }

      let Na2x = array1[k * 14 + 6];
      let Na2xD = array1[k * 14 + 7];
      Na2x = Na2x + Na2xD;
      if (Na2x < Nx2 * 0.5 || Na2x > Nx2 * 0.9 || random(10) < chance) {
        Na2xD *= -1;
      }

      let Na1y = array1[k * 14 + 8];
      let Na1yD = array1[k * 14 + 9];
      let Na2y = array1[k * 14 + 10];
      let Na2yD = array1[k * 14 + 11];
      if (overlap == 0) {
        Na1y = Na1x * tan(ang);
        let maxNa2x = Na2x * tan(ang) * 0.9;
        Na2y = Na2y + Na2yD;
        if (Na2y < maxNa2x * 0.01 || Na2y > maxNa2x || random(10) < chance) {
          Na2yD *= -1;
        }
      } else {
        Na1y = Na1y + Na1yD;
        if (Na1y < 20 / k || Na1y > 245 - k * cush || random(10) < chance) {
          Na1yD *= -1;
        }
        Na2y = Na2y + Na2yD;
        if (Na2y < 20 / k || Na2y > 245 - k * cush || random(10) < chance) {
          Na2yD *= -1;
        }
      }
      let Nhuey = array1[k * 14 + 12];
      let NhueyD = array1[k * 14 + 13];
      Nhuey = Nhuey + NhueyD;
      if (Nhuey > 359) {
        Nhuey = 0;
      }
      if (Nhuey < 0) {
        Nhuey = 359;
      }
      if (random(10) < chance) {
        NhueyD *= -1;
      }
      // let r = Math.floor(Math.random() * 255);
      // let g = Math.floor(Math.random() * 255);
      // let b = Math.floor(Math.random() * 255);
      // drawingContext.shadowBlur = 15;
      // drawingContext.shadowColor = color(r, g, b);
      //fill(r, g, b, alph);
      //fill(Nhuey, sat, brt, alph);
      noFill();
      newArray.push(
        Nx1,
        Nx1D,
        Nx2,
        Nx2D,
        Na1x,
        Na1xD,
        Na2x,
        Na2xD,
        Na1y,
        Na1yD,
        Na2y,
        Na2yD,
        Nhuey,
        NhueyD
      );

      // draw one set of petals
      for (let i = 0; i < sym / 2; i++) {
        if (strokeYN == 1) {
          stroke(Nhuey, sat, brt, alph);
          strokeWeight(strokeW);
        } else {
          noStroke();
        }
        if (beziers == 0) {
          beginShape();
          curveVertex(Nx1, 0);
          curveVertex(Nx1, 0);
          curveVertex(Na1x, Na1y);
          curveVertex(Na2x, Na2y);
          curveVertex(Nx2, 0);
          curveVertex(Nx2, 0);
          endShape();

          beginShape();
          curveVertex(Nx1, 0);
          curveVertex(Nx1, 0);
          curveVertex(Na1x, -Na1y);
          curveVertex(Na2x, -Na2y);
          curveVertex(Nx2, 0);
          curveVertex(Nx2, 0);
          endShape();
          if (strokeYN == 1) {
            stroke(Nhuey, sat, brt, alph);
            line(Nx1, 0, Nx2, 0);
          }
        } else {
          bezier(Nx1, 0, Na1x, Na1y, Na2x, Na2y, Nx2, 0);
          bezier(Nx1, 0, Na1x, -Na1y, Na2x, -Na2y, Nx2, 0);
        }
        rotate(ang * 2);
        ang += 360 / sym / layers / 10000;
      }
    }
    pop();
    array1 = newArray;
  }
}

// Button functions
function petalsRandom() {
  pRand = pRand * -1;
  if (pRand == 1) {
    randomPetalsButton.style("background-color", "red");
  } else {
    randomPetalsButton.style("background-color", "blue");
  }
}
function layersRandom() {
  lRand = lRand * -1;
  if (lRand == 1) {
    randomLayersButton.style("background-color", "red");
  } else {
    randomLayersButton.style("background-color", "blue");
  }
}
function alphaRandom() {
  aRand = aRand * -1;
  if (aRand == 1) {
    randomAlphaButton.style("background-color", "red");
  } else {
    randomAlphaButton.style("background-color", "blue");
  }
}
function outline() {
  strokeYN = 1;
  strokeRand = 0;
  noOutlineButton.style("background-color", "red");
  noOutlineButton.style("color", "white");
  noOutlineButton.style("border", 0);
  noOutlineButton.style("border-radius", "3px");
  noOutlineButton.style("padding-left", "5px");
  noOutlineButton.style("padding-right", "5px");

  outlineButton.style("background-color", "green");
  outlineButton.style("color", "white");
  outlineButton.style("border", 0);
  outlineButton.style("border-radius", "3px");
  outlineButton.style("padding-left", "15px");
  outlineButton.style("padding-right", "15px");

  randOutButton.style("background-color", "red");
  randOutButton.style("color", "white");
  randOutButton.style("border", 0);
  randOutButton.style("border-radius", "3px");
  randOutButton.style("padding-left", "15px");
  randOutButton.style("padding-right", "15px");
}
function noOutline() {
  strokeYN = 0;
  strokeRand = 0;
  noOutlineButton.style("background-color", "green");
  noOutlineButton.style("color", "white");
  noOutlineButton.style("border", 0);
  noOutlineButton.style("border-radius", "3px");
  noOutlineButton.style("padding-left", "5px");
  noOutlineButton.style("padding-right", "5px");

  outlineButton.style("background-color", "red");
  outlineButton.style("color", "white");
  outlineButton.style("border", 0);
  outlineButton.style("border-radius", "3px");
  outlineButton.style("padding-left", "15px");
  outlineButton.style("padding-right", "15px");

  randOutButton.style("background-color", "red");
  randOutButton.style("color", "white");
  randOutButton.style("border", 0);
  randOutButton.style("border-radius", "3px");
  randOutButton.style("padding-left", "15px");
  randOutButton.style("padding-right", "15px");
}
function randOutline() {
  strokeRand = 1;
  noOutlineButton.style("background-color", "red");
  noOutlineButton.style("color", "white");
  noOutlineButton.style("border", 0);
  noOutlineButton.style("border-radius", "3px");
  noOutlineButton.style("padding-left", "5px");
  noOutlineButton.style("padding-right", "5px");

  outlineButton.style("background-color", "red");
  outlineButton.style("color", "white");
  outlineButton.style("border", 0);
  outlineButton.style("border-radius", "3px");
  outlineButton.style("padding-left", "15px");
  outlineButton.style("padding-right", "15px");

  randOutButton.style("background-color", "green");
  randOutButton.style("color", "white");
  randOutButton.style("border", 0);
  randOutButton.style("border-radius", "3px");
  randOutButton.style("padding-left", "15px");
  randOutButton.style("padding-right", "15px");
}
function curve1() {
  beziers = 0;
  cRand = false;
  curve2Button.style("background-color", "red");
  randCurveButton.style("background-color", "red");
  curve1Button.style("background-color", "green");
}
function curve2() {
  beziers = 1;
  cRand = false;
  curve1Button.style("background-color", "red");
  curve1Button.style("color", "white");
  curve1Button.style("border", 0);
  curve1Button.style("border-radius", "3px");
  curve1Button.style("padding-left", "15px");
  curve1Button.style("padding-right", "15px");

  randCurveButton.style("background-color", "red");
  randCurveButton.style("color", "white");
  randCurveButton.style("border", 0);
  randCurveButton.style("border-radius", "3px");
  randCurveButton.style("padding-left", "15px");
  randCurveButton.style("padding-right", "15px");

  curve2Button.style("background-color", "green");
  curve2Button.style("color", "white");
  curve2Button.style("border", 0);
  curve2Button.style("border-radius", "3px");
  curve2Button.style("padding-left", "15px");
  curve2Button.style("padding-right", "15px");
}
function randCurve() {
  cRand = true;
  curve1Button.style("background-color", "red");
  curve1Button.style("color", "white");
  curve1Button.style("border", 0);
  curve1Button.style("border-radius", "3px");
  curve1Button.style("padding-left", "15px");
  curve1Button.style("padding-right", "15px");

  curve2Button.style("background-color", "red");
  curve2Button.style("color", "white");
  curve2Button.style("border", 0);
  curve2Button.style("border-radius", "3px");
  curve2Button.style("padding-left", "15px");
  curve2Button.style("padding-right", "15px");

  randCurveButton.style("background-color", "green");
  randCurveButton.style("color", "white");
  randCurveButton.style("border", 0);
  randCurveButton.style("border-radius", "3px");
  randCurveButton.style("padding-left", "15px");
  randCurveButton.style("padding-right", "15px");
}

function overlapYes() {
  overlap = 1;
  randOverl = false;
  overlapButton.style("background-color", "green");
  overlapButton.style("color", "white");
  overlapButton.style("border", 0);
  overlapButton.style("border-radius", "3px");
  overlapButton.style("padding-left", "5px");
  overlapButton.style("padding-right", "5px");

  noOverlapButton.style("background-color", "red");
  noOverlapButton.style("color", "white");
  noOverlapButton.style("border", 0);
  noOverlapButton.style("border-radius", "3px");
  noOverlapButton.style("padding-left", "5px");
  noOverlapButton.style("padding-right", "5px");

  randOverlapButton.style("background-color", "red");
  randOverlapButton.style("color", "white");
  randOverlapButton.style("border", 0);
  randOverlapButton.style("border-radius", "3px");
  randOverlapButton.style("padding-left", "15px");
  randOverlapButton.style("padding-right", "15px");
}
function noOverlap() {
  overlap = 0;
  randOverl = false;
  overlapButton.style("background-color", "red");
  overlapButton.style("color", "white");
  overlapButton.style("border", 0);
  overlapButton.style("border-radius", "3px");
  overlapButton.style("padding-left", "5px");
  overlapButton.style("padding-right", "5px");

  noOverlapButton.style("background-color", "green");
  noOverlapButton.style("color", "white");
  noOverlapButton.style("border", 0);
  noOverlapButton.style("border-radius", "3px");
  noOverlapButton.style("padding-left", "5px");
  noOverlapButton.style("padding-right", "5px");

  randOverlapButton.style("background-color", "red");
  randOverlapButton.style("color", "white");
  randOverlapButton.style("border", 0);
  randOverlapButton.style("border-radius", "3px");
  randOverlapButton.style("padding-left", "15px");
  randOverlapButton.style("padding-right", "15px");
}
function randOverlap() {
  randOverl = true;
  overlapButton.style("background-color", "red");
  overlapButton.style("color", "white");
  overlapButton.style("border", 0);
  overlapButton.style("border-radius", "3px");
  overlapButton.style("padding-left", "5px");
  overlapButton.style("padding-right", "5px");

  noOverlapButton.style("background-color", "red");
  noOverlapButton.style("color", "white");
  noOverlapButton.style("border", 0);
  noOverlapButton.style("border-radius", "3px");
  noOverlapButton.style("padding-left", "5px");
  noOverlapButton.style("padding-right", "5px");

  randOverlapButton.style("background-color", "green");
  randOverlapButton.style("color", "white");
  randOverlapButton.style("border", 0);
  randOverlapButton.style("border-radius", "3px");
  randOverlapButton.style("padding-left", "15px");
  randOverlapButton.style("padding-right", "15px");
}

function saveJpg() {
  var ID = Math.random().toString(36).slice(2);
  save("MOC" + ID.toUpperCase() + ".jpg");
}

function pause() {
  paused *= -1;
}
