
let canvasL = 400;
let canvasH = 400;

let grid_L = 240;
let grid_H = 240;

let nb_points_L = 20
let nb_points_H = 20

let w_H = grid_H/nb_points_H;
let w_L = grid_L/nb_points_L;

let prospect_angle = 3.14/3.5;

var fishnet = [];
var update = 0;

let angle = 0;

let ma;
let maxD;

let Zslider;
let wave_slider;

function setup() {
  Zslider = createSlider(0, 140, 30);
  Zslider.position(265, 15);
  wave_slider = createSlider(0, 90, 30);
  wave_slider.position(15, 15);

  createCanvas(canvasL, canvasH, WEBGL);
  for (var x = 0; x < nb_points_L; x++) {
    fishnet[x] = [];
    for (var y = 0; y < nb_points_H; y++) {
      fishnet[x][y] = 0
    }
  }
 
}

function draw() {

  const w_max = wave_slider.value();
  const z_max = Zslider.value();


  update -= 0.01;

  var yoff = update;
  for (var y = 0; y < nb_points_H; y++) {
    var xoff = 0;
    for (var x = 0; x < nb_points_L; x++) {
      fishnet[x][y] = map(noise(xoff, yoff), 0, 1, -w_max, w_max);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(100);
  stroke(0)
  noFill();

  translate(0, 50);
  rotateX(PI / 3);
 
  translate(-grid_L/2, -grid_H/2, z_max);

  
  for (var y = 0; y < nb_points_H-1; y++) {
    
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < nb_points_L; x++) {

      z = random(-10,10)
      vertex(x * w_L, y * w_H, fishnet[x][y]);
      vertex(x * w_L, (y + 1) * w_H, fishnet[x][y+1]);
    }
    endShape();
  }
 
}