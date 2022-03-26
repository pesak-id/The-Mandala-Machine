// let x1, x2, x3, x4, y2, y3;
// var symmetries = 5;

// function setup() {
//   // canvas configurations
//   let canvasWidth = 2048; //changeable canvas width
//   let canvasHeight = 2048; //changeable canvas height
//   createCanvas(canvasWidth, canvasHeight);
//   background(0);
//   angleMode(DEGREES); // canvas configs updated
//   colorMode(
//     RGB,
//     random(1, 255),
//     random(1, 255),
//     random(1, 255),
//     random(0.1, 1)
//   );
//   // brings the point to the center
//   translate(width / 2, height / 2);
//   //circle(0,0,50);

//   let ang = random(360) / symmetries;

//   let removal = 55;
//   let layer = 555;

//   for (let i = 0; i < layer; i++) {
//     x4 = random(230 + 50 - i * removal, 250 + 50 - i * removal);
//     x3 = random(210 + 50 - i * removal, 230 + 50 - i * removal);
//     x2 = random(190 + 50 - i * removal, 215 + 50 - i * removal);
//     x1 = random(185 + 50 - i * removal, 205 + 50 - i * removal);
//     let maxX2 = x2 * tan(ang * 0.5);
//     y2 = random(5, maxX2); // preventing overlapping
//     y3 = random(5, maxX2); // // preventing overlapping

//     let hue = random(1, 240);
//     let sat = random(0, 100);
//     let brgt = random(0, 100);
//     let opacity = random(0.1, 1);

//     for (let i = 0; i < symmetries; i++) {
//       fill(hue, sat, brgt, opacity);
//       stroke(0, 0, 0);
//       beginShape();
//       curveVertex(x1, 0);
//       curveVertex(x1, 0);
//       curveVertex(x2, y2);
//       curveVertex(x3, y3);
//       curveVertex(x4, 0);
//       curveVertex(x4, 0);
//       endShape();

//       // opposite shape
//       beginShape();
//       curveVertex(x1, 0);
//       curveVertex(x1, 0);
//       curveVertex(x2, -y2);
//       curveVertex(x3, -y3);
//       curveVertex(x4, 0);
//       curveVertex(x4, 0);
//       endShape();

//       stroke(hue, sat, brgt, opacity);
//       strokeWeight(2);
//       line(x1 + 3, 0, x4 - 4, 0);
//       // only the canvas rotates
//       rotate(ang);
//     }
//   }
// }

// function draw() {}
// var ID = Math.random().toString(36).slice(2);
// function keyPressed() {
//   //if the key is a s
//   if (key == "s") {
//     //save out to a file
//     save("M555-" + ID.toUpperCase() + ".jpg");
//   }
// }

//ARMS MANDALAS

// let arms = [];
// let dense = Math.floor(Math.random() * 1000) + 0.01;
// let scale = 100;
// function setup() {
//   createCanvas(800, 800);
//   for (let i = 0; i < dense; i++) {
//     arms.push(new chain(i));
//     background(0);
//   }
// }

// function draw() {
//   background(0);
//   let len = map(
//     noise(frameCount * Math.floor(Math.random() * 0.1) + 0.0001),
//     0,
//     1,
//     scale,
//     25
//   );
//   for (let i = 0; i < dense; i++) {
//     push();
//     translate(width / 2, height / 2);
//     rotate(PI * (i * 0.1));
//     push();
//     arms[i].xoff = 0;
//     arms[i].update(len, i);
//     pop();
//     pop();
//   }
// }

// function chain(_i) {
//   this.xoff = random(100);
//   this.yoff = _i * Math.floor(Math.random() * 1) + 0.00001;
//   this.theta = 0;
//   this.sw = 0;

//   this.update = function (size, _i) {
//     this.xoff += 0.1;
//     this.theta = map(noise(this.xoff, this.yoff), 0, 1, -PI, PI);
//     let fc = frameCount;
//     let colrVal = Math.floor(Math.random() * 254) + 1;
//     let colgVal = Math.floor(Math.random() * 254) + 1;
//     let colbVal = Math.floor(Math.random() * 254) + 1;
//     let colr = map(noise(this.xoff, fc + 0.01 + this.yoff), 0, 1, colrVal, 305);
//     let colg = map(noise(this.xoff, fc + 0.01 + this.yoff), 0, 1, colgVal, 305);
//     let colb = map(noise(this.xoff, fc + 0.01 + this.yoff), 0, 1, colbVal, 305);

//     stroke(colr, colg, colb, 255);
//     this.sw = map(size, 100, 1, 10, 2);
//     strokeWeight(this.sw);
//     line(0, 0, size, 0);
//     translate(size, 0);
//     rotate(this.theta);
//     if (size > 1) {
//       this.update(size * 0.8);
//       this.yoff += 0.0005;
//     }
//   };
// }

// MORPHING MANDALA

// By Steve's Makerspace
// https://youtu.be/HYn-rgeSjL0
// p to pause, n for new art, s to save jpg
// mess with the variables below

// By Steve's Makerspace

let rate = 1.2; //rate of pedal change 0.4
let hueyD = 1.1; //rate of color change 1.1
let fr = 30; //framerate 40
let chance = 0.3; //chance in 10 of reversal 0.3
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
  let size = min(1024, 1024);
  canvas = createCanvas(1024, 1024);
  canvas.position(0, 0);
  hSize = size / 2;
  angleMode(DEGREES);
  translate(width / 2, height / 2);

  // create user interface
  let noPetals = createElement("noPetals", "Jumlah Kelopak");
  noPetals.position(40, 0);
  noPetals.style("color", "white");
  petalSlider = createSlider(8, 999, 16);
  petalSlider.position(10, 20);
  let noLayers = createElement("noLayers", "Jumlah Layer");
  noLayers.position(175, 0);
  noLayers.style("color", "white");
  layersSlider = createSlider(3, 999, 16);
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

  colorMode(HSB, 256, 100, 100, 100);
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
    sym = random(3, 32);
  }
  ang = 360 / sym;
  if (lRand == 1) {
    layers = layersSlider.value();
  } else {
    layers = random(3, 32);
  }
  cush = (hSize / layers) * 4; // cushion between each layer
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
    sat = random(70, 100); //You could play
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
    background(0);
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

      fill(Nhuey, sat, brt, alph);
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
          stroke(0);
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
  save("MDL" + ID.toUpperCase() + ".jpg");
}

function pause() {
  paused *= -1;
}
