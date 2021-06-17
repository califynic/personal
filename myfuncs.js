import React from 'react'
import ReactDOM from 'react-dom'
import Srand from 'seeded-rand'

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

var running = false;

var noise_pxl = createArray(1000, 1000);

var SimplexNoise = require('simplex-noise');
var simplex = new SimplexNoise(Math.random);
var simplex_1d = new SimplexNoise(Math.random);

var xmap, ymap, distorted;
var cx, cy, r, lim, merge;
var contourOk, permSavedBW, whichSaved;
var square_size = 12;
var contourPerm = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.95];

export function StartBackground () {
    if (typeof window != 'undefined'){
      var canvas = document.getElementById("stars");
      var ctx = canvas.getContext('2d');
      ctx.canvas.width = square_size * Math.ceil(screen.width / square_size);
      ctx.canvas.height = square_size * Math.ceil(screen.height / square_size);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let style =  `
          background-image: url(${canvas.toDataURL()});
          background-repeat: no-repeat;
          background-size: 100% 100vh;
          background-color: #000`

      /*document.body.style.background = style;
      if (window.sessionStorage.getItem('bg') === null) {
        window.sessionStorage.setItem('bg', Math.random() * 2147483647);
      }
      React.useEffect(() => {
          window.onbeforeunload = function() {
              window.sessionStorage.removeItem('bg');
              alert("");
          };
      }, []);*/
    }
    return;
}


var border = 3;
var powers = [];
for (var i = 0; i < 30; i++) {
  powers.push(0.99);
}
for (var i = 0; i < 3; i++) {
  powers.push(0.995);
}
for (var i = 0; i < 1; i++) {
  powers.push(0.9995);
}
//console.log(powers);
var num_iter = 100;
var xc = new Array(num_iter);
var yc = new Array(num_iter);
function afterLoadGenerateMesh() {
  var canvas = document.getElementById("stars");
  var ctx = canvas.getContext('2d');

  var width = ctx.canvas.clientWidth;
  var height = ctx.canvas.clientHeight;

  for (var i = 0; i < num_iter; i++) {
    xc[i] = Math.random() * (width + square_size + border * 2) - border;
    yc[i] = Math.random() * (height + square_size + border * 2) - border;
  }
}

function distort(width, height, square_size, strength) {
  width = width + 1;
  height = height + 1;

  /*var ret = createArray(width, height, 2);
  var border = 3;
  var powers = [];
  for (var i = 0; i < 30; i++) {
    powers.push(0.99);
  }
  for (var i = 0; i < 3; i++) {
    powers.push(0.995);
  }
  for (var i = 0; i < 1; i++) {
    powers.push(0.9995);
  }
  //console.log(powers);
  var num_iter = 100;
  var xc, yc, power, dist;*/
  var ret = createArray(width, height, 2);
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      ret[x][y][0] = x * square_size;
      ret[x][y][1] = y * square_size;
    }
  }
  for (var i = 0; i < num_iter; i++) {
    /*xc = Math.random() * (square_size * width + border * 2) - border;
    yc = Math.random() * (square_size * height + border * 2) - border;*/
    //power = powers[Math.floor(Math.random() * powers.length)];
    var power = powers[i % powers.length];
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var dist = Math.sqrt((xc[i] - ret[x][y][0])**2 + (yc[i] - ret[x][y][1])**2);
        dist = 0.5 * (power**(strength + dist));
        // console.log(dist);
        ret[x][y][0] = ret[x][y][0] * (1 - dist) + xc[i] * dist;
        ret[x][y][1] = ret[x][y][1] * (1 - dist) + yc[i] * dist;
      }
    }
  }

  var minx = width * square_size;
  var maxx = 0;
  var miny = height * square_size;
  var maxy = 0;

  for (var y = 0; y < height; y++) {
    if (ret[0][y][0] > maxx) {
      maxx = ret[0][y][0];
    }
    if (ret[width - 1][y][0] < minx) {
      minx = ret[width - 1][y][0];
    }
  }
  for (var x = 0; x < width; x++) {
    if (ret[x][0][1] > maxy) {
      maxy = ret[x][0][1];
    }
    if (ret[x][height - 1][1] < miny) {
      miny = ret[x][height - 1][1];
    }
  }


  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      ret[x][y][0] = ((ret[x][y][0] - minx) / (maxx - minx)) * width * square_size;
      ret[x][y][1] = ((ret[x][y][1] - miny) / (maxy - miny)) * height * square_size;
    }
  }

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      ret[x][y][0] = Math.floor(ret[x][y][0]);
      ret[x][y][1] = Math.floor(ret[x][y][1]);
    }
  }
  return ret;
}

function drawMesh() {
  running = true;

  var canvas = document.getElementById("stars");
  var ctx = canvas.getContext('2d');

  var width = ctx.canvas.clientWidth;
  var height = ctx.canvas.clientHeight;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  distorted = distort(width / square_size, height / square_size, square_size, 0);

  var size = Math.min(Math.max(Math.ceil(screen.width / window.innerWidth), Math.ceil(screen.height / window.innerHeight)), 5);
  console.log(size);
  for (var i = 0; i < width / square_size; i++) {
    for (var j = 0; j < height / square_size; j++) {
      ctx.fillStyle = "rgb(" + Math.floor((1 - distorted[i][j][1] / height) * 255) + ",0,0)";
      ctx.fillRect(distorted[i][j][0], distorted[i][j][1], size, size);
    }
  }

  let style =  `
      background-image: url(${canvas.toDataURL()});
      background-repeat: no-repeat;
      background-size: 100%;
      background-color: #000`
  var img_tag = new Image();

  // when preload is complete, apply the image to the div
  img_tag.onload = function() {
      document.body.style = style;
  }
  // setting 'src' actually starts the preload
  img_tag.src = canvas.toDataURL();
}


export function DrawBackground () {
  if (typeof window != 'undefined'){
    var seed = window.sessionStorage.getItem('bg');
    var rand = new Srand();
    Srand.seed(seed);
    console.log(seed);

    var canvas = document.getElementById("stars");
    var ctx = canvas.getContext('2d');

    var width = ctx.canvas.clientWidth;
    var height = ctx.canvas.clientHeight;

    contourOk = createArray(width / square_size, height / square_size, 9);
    for (var i = 0; i < width / square_size; i++) {
      for (var j = 0; j < height / square_size; j++) {
        for (var k = 0; k < 9; k++) {
          contourOk[i][j][k] = true;
        }
      }
    }

    permSavedBW = createArray(width / square_size, height / square_size, 9);
    whichSaved = [];
    for (var i = 0; i < 9; i++) {
      whichSaved.push(Number.POSITIVE_INFINITY);
    }

    if (!running) {
      afterLoadGenerateMesh();
      drawMesh();
    }

    window.addEventListener('resize', drawMesh);
  }
}


////// HERE


function x_shift(width) {
  var xmap = [];
  var curr_sum = 0;
  for (var x = 0; x < width; x++) {
    xmap.push(curr_sum);
    curr_sum += 1 + 0.65 * simplex_1d.noise2D(x / (0.05 * width), 0);
  }
  for (var x = 0; x < width; x++) {
    xmap[x] = xmap[x] / curr_sum * width;
  }
  return xmap;
}

function y_shift(height) {
  var ymap = [];
  var curr_sum = 0;
  for (var y = 0; y < height; y++) {
    ymap.push(curr_sum);
    curr_sum += 1 + 0.65 * simplex_1d.noise2D(y / (0.05 * height), 10);
  }
  for (var y = 0; y < height; y++) {
    ymap[y] = ymap[y] / curr_sum * height;
  }
  return ymap;
}

// cx, cy, r, lim, merge
function CircleGenerate(width, height) {
  var num_circ = 3;
  var connect = 1;
  var border = -50;
  var min_r = 50;
  var max_r = 400;

  cx = [];
  cy = [];
  r = [];
  lim = [];
  merge = [];

  for (var i = 0; i < num_circ; i++) {
    cx.push(Math.random() * (width + 2 * border) - border);
    cy.push(Math.random() * (width + 2 * border) - border);
    r.push(Math.exp(Math.random() * (Math.log(max_r) - Math.log(min_r)) + Math.log(min_r)));
    lim.push(Math.random() * 0.15);
    //lim.push(0);
  }

  for (var i = 0; i < num_circ; i++) {
    var c1 = Math.floor(Math.random() * num_circ);
    var c2 = Math.floor(Math.random() * num_circ);
    while (c1 == c2) {
      c2 = Math.floor(Math.random() * num_circ);
    }
    merge.push([c1, c2]);
  }
}

function Circle(x, y, cx, cy, r) {
  return Math.min(r / Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)), 5);
}

// CLOCKWISE or COUNTERCLOCKWISE order only!!
function Quadrilateral(x1, y1, x2, y2, x3, y3, x4, y4, x, y) {
  // x1 y1
  // x2 y2
  // x3 y3
  // x4 y4

  // x y
  // x1 y1
  // x2 y2
  var area = 1/2 * Math.abs(x3 * y1 + x1 * y2 + x2 * y3 - x3 * y2 - x1 * y3 - x2 * y1) + 1/2 * Math.abs(x3 * y1 + x1 * y4 + x4 * y3 - x3 * y4 - x1 * y3 - x4 * y1);
  var a12 = 1/2 * Math.abs(x * y1 + x1 * y2 + x2 * y - x * y2 - x1 * y - x2 * y1);
  var a23 = 1/2 * Math.abs(x * y2 + x2 * y3 + x3 * y - x * y3 - x2 * y - x3 * y2);
  var a34 = 1/2 * Math.abs(x * y3 + x3 * y4 + x4 * y - x * y4 - x3 * y - x4 * y3);
  var a41 = 1/2 * Math.abs(x * y4 + x4 * y1 + x1 * y - x * y1 - x4 * y - x1 * y4);

  if (Math.abs(area - a12 - a23 - a34 - a41) < 0.001) {
    return 1;
  } else {
    return 0;
  }
}

function Merge(x, y, c1x, c1y, r1, c2x, c2y, r2) {
  var mid = (r1 + r2) * 1;

  //center eqs
  //(px - c1x)^2 + (py - c1y)^2 = (r1 + mid)^2
  //(px - c2x)^2 + (py - c2y)^2 = (r2 + mid)^2

  //-2 * (px - c1x) * c1x - c1x^2 + 2 * (px - c1x) * c2x - c2x^2 + 2 * c1x * c2x
   //- 2 * py * c1y + c1y^2 - 2 * py * c2y + c2y^2 = (r1 + mid)^2 - (r2 + mid)^2

  // u * (-2 * c1x - 2 * c2x) - c1x^2 + c2x^2 - 2 * c1x * c2x
   //v * (-2 * c1y - 2 * c2y) - c1y^2 + c2y^2 - 2 * c1y * c2y
   //= (r1 + mid)^2 - (r2 + mid)^2

  // u = px - c1x
   //v = py - c1y

   var u_coef = -2 * c1x + 2 * c2x;
   var v_coef = -2 * c1y + 2 * c2y;
   var side = (r1 + mid)**2 - (r2 + mid)**2 + c1x**2 + c2x**2 - 2 * c1x * c2x + c1y**2 + c2y**2 - 2 * c1y * c2y;

  // u * u_coef + v * v_coef = side
   //v = (side - u * u_coef) / v_coef
   //u^2 + v^2 = (r1 + mid)^2

   //u^2 + ((side - u * u_coef) / v_coef)^2 = (r1 + mid)^2

   //u^2 * (1 + u_coef^2 / v_coef^2) - 2 * u * u_coef * side / v_coef^2 + side^2 / v_coef^2 = (r1 + mid)^2

   var a = 1 + u_coef**2 / v_coef**2;
   var b = - 2 * u_coef * side / v_coef**2;
   var c = side**2 / v_coef**2 - (r1 + mid)**2;

   var u1 = (-b + Math.sqrt(b**2 - 4 * a * c)) / (2 * a);
   var v1 = (side - u1 * u_coef) / v_coef;
   var u2 = (-b - Math.sqrt(b**2 - 4 * a * c)) / (2 * a);
   var v2 = (side - u2 * u_coef) / v_coef;

   var cx1 = u1 + c1x;
   var cy1 = v1 + c1y;
   var cx2 = u2 + c1x;
   var cy2 = v2 + c1y;

   var t1x = c1x * (mid / (r1 + mid)) + cx1 * (r1 / (r1 + mid));
   var t1y = c1y * (mid / (r1 + mid)) + cy1 * (r1 / (r1 + mid));
   var t2x = c1x * (mid / (r1 + mid)) + cx2 * (r1 / (r1 + mid));
   var t2y = c1y * (mid / (r1 + mid)) + cy2 * (r1 / (r1 + mid));
   var t3x = c2x * (mid / (r2 + mid)) + cx1 * (r2 / (r2 + mid));
   var t3y = c2y * (mid / (r2 + mid)) + cy1 * (r2 / (r2 + mid));
   var t4x = c2x * (mid / (r2 + mid)) + cx2 * (r2 / (r2 + mid));
   var t4y = c2y * (mid / (r2 + mid)) + cy2 * (r2 / (r2 + mid));

   //return Quadrilateral(t1x, t1y, t2x, t2y, t4x, t4y, t3x, t3y, x, y) - Circle(x, y, cx1, cy1, mid)- Circle(x, y, cx2, cy2, mid);
   if (Circle(x, y, cx1, cy1, mid) >= 1 || Circle(x, y, cx2, cy2, mid) >= 1) {
     return 0;
   } else if (Quadrilateral(t1x, t1y, t2x, t2y, t4x, t4y, t3x, t3y, x, y) == 1) {
      return Math.min( Math.sqrt(((x - cx1)**2 + (y - cy1)**2) / mid**2), Math.sqrt(((x - cx2)**2 + (y - cy2)**2) / mid**2));
   } else {
     return 0;
   }
 }

function BW(x, y, a, square_size) {
  /*var c1_cx = 450;
  var c1_cy = 450;
  var c1_r = 54 * a;
  var c2_cx = 400;
  var c2_cy = 330;
  var c2_r = 100 * a;*/

  //console.log(x);
  //console.log(y);
  //console.log(distorted[0][6]);
  var origx = x;
  x = xmap[distorted[x / square_size][y / square_size][0]];
  y = ymap[distorted[origx / square_size][y / square_size][1]];

  /*var circ1 = Circle(x, y, c1_cx, c1_cy, c1_r);
  var circ2 = Circle(x, y, c2_cx, c2_cy, c2_r);
  var merge = Merge(x, y, c1_cx, c1_cy, c1_r, c2_cx, c2_cy, c2_r);

  var ret = Math.max(Math.max(circ1, circ2), merge);*/

  var max = 0;
  for (var i = 0; i < r.length; i++) {
    if (a > lim[i]) {
      var circ = Circle(x, y, cx[i], cy[i], r[i] * a);
      if (circ > max) {
        max = circ;
      }
    }
  }

  for (var i = 0; i < merge.length; i++) {
    if (a > lim[merge[i][0]] && a > lim[merge[i][1]]) {
      var merge_one = Merge(x, y, cx[merge[i][0]], cy[merge[i][0]], r[merge[i][0]] * a, cx[merge[i][1]], cy[merge[i][1]], r[merge[i][1]] * a);
      if (merge_one > max) {
        max = merge_one;
      }
    }
  }

  if (max == Number.POSITIVE_INFINITY) {
    max = 2**30 - 1;
  }
  //console.log(max);
  return max + 0.05 * simplex.noise2D(x / 5, y / 5);
}

function fillTri(ctx, x1, y1, x2, y2, x3, y3) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
}

function fillQuad(ctx, x1, y1, x2, y2, x3, y3, x4, y4) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.closePath();
  ctx.fill();
}

function fillPent(ctx, x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.lineTo(x5, y5);
  ctx.closePath();
  ctx.fill();
}

function fillHex(ctx, x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.lineTo(x5, y5);
  ctx.lineTo(x6, y6);
  ctx.closePath();
  ctx.fill();
}

function linterp(a, diff, aval, bval, thresh=1) {
  var x = (thresh - bval) / (aval - bval);
  return a * x + (a + diff) * (1 - x);
}

function cmap(color) {
  var r, g, b;
  if (0 <= color && color < 0.5) {
    color = color * 2;
    r = Math.floor(0 * (1 - color) + 3 * color);
    g = Math.floor(0 * (1 - color) + 21 * color);
    b = Math.floor(0 * (1 - color) + 99 * color);
    return "rgb(" + r + "," + g + "," + b + ")";
  } else if (0.5 <= color && color < 0.8) {
    color = (color - 0.5) * 10 / 3;
    r = Math.floor(3 * (1 - color) + 113 * color);
    g = Math.floor(21 * (1 - color) + 217 * color);
    b = Math.floor(99 * (1 - color) + 199 * color);
    return "rgb(" + r + "," + g + "," + b + ")";
  } else if (0.8 <= color && color < 1) {
    color = (color - 0.8) * 5;
    r = Math.floor(113 * (1 - color) + 255 * color);
    g = Math.floor(217 * (1 - color) + 255 * color);
    b = Math.floor(199 * (1 - color) + 255 * color);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  // 255 242 125
}



function DrawGas (rand, time) {
  running = true;

  var canvas = document.getElementById("stars");
  var ctx = canvas.getContext('2d');

  var width = ctx.canvas.clientWidth;
  var height = ctx.canvas.clientHeight;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  if (time == 0) {
    xmap = x_shift(width);
    ymap = y_shift(height);
    distorted = distort(width / square_size, height / square_size, square_size);
    CircleGenerate(width, height);
  }
  for (var x = 0; x < 100; x++) {
    ctx.fillStyle = cmap(x / 100);
    ctx.fillRect(x, 0, 1, 10);
  }

  var contours = [];

  // c1: t=0 @ 1; t=1 @ 0.1
  // c2: t=1 @ 1; t=2 @ 0.2
  // c3: t=2 @ 1; t=4 @ 0.3
  // c4: t=6 @ 1; t=12 @ 0.4
  // c5: t=18 @ 1; t=36 @ 0.5
  // c6: t=54 @ 1; t=162 @ 0.6
  // c7: t=216 @ 1; t=648 @ 0.7
  // c8: t=1080 @ 1; t=3240 @ 0.8
  // c9: t=3240 @ 1; t=6480 @ 0.95

  // 0.1 + 0.9 * 2^(-t * 1)
  contours.push(0.1 + 0.9 * Math.pow(2, -1 * (time / 25) / 1));
  if (time >= 1 * 25) {
    contours.push(0.2 + 0.8 * Math.pow(2, -1 * (time / 25) / 1));
  }
  if (time >= 2 * 25) {
    contours.push(0.3 + 0.7 * Math.pow(2, -1 * (time / 25) / 2));
  }
  if (time >= 6 * 25) {
    contours.push(0.4 + 0.6 * Math.pow(2, -1 * (time / 25) / 6));
  }
  if (time >= 18 * 25) {
    contours.push(0.5 + 0.5 * Math.pow(2, -1 * (time / 25) / 18));
  }
  if (time >= 54 * 25) {
    contours.push(0.6 + 0.4 * Math.pow(2, -1 * (time / 25) / 108));
  }
  if (time >= 216 * 25) {
    contours.push(0.7 + 0.3 * Math.pow(2, -1 * (time / 25) / 432));
  }
  if (time >= 1080 * 25) {
    contours.push(0.8 + 0.2 * Math.pow(2, -1 * (time / 25) / 2160));
  }
  if (time >= 3240 * 25) {
    contours.push(0.95 + 0.05 * Math.pow(2, -1 * (time / 25) / 3240));
  }
  //console.log(contours);

  var savedBW = createArray(width / square_size + 1, height / square_size + 1, contours.length);
  for (var i = 0; i < width / square_size; i++) {
    for (var j = 0; j < height / square_size; j++) {
      for (var k = 0; k < contours.length; k++) {
        savedBW[i][j][k] = -1;
      }
    }
  }

  /*for (var i = 0; i < width; i = i + square_size) {
  	for (var j = 0; j < height; j = j + square_size) {
      inner:
      for (var k = contours.length - 1; k >= 0; k--) {
        if (!contourOk[i / square_size][j / square_size][k]){
          break inner;
        }

        var a = contours[k];
        var sw, se, ne, nw;
        if (time < whichSaved[k]) {
          sw = savedBW[i / square_size][j / square_size + 1][k];
          se = savedBW[i / square_size + 1][j / square_size + 1][k];
          ne = savedBW[i / square_size + 1][j / square_size][k];
          nw = savedBW[i / square_size][j / square_size][k];
        } else {
          if (savedBW[i / square_size][j / square_size + 1][k] == -1) {
            sw = BW(i, j + square_size, a, square_size);
            savedBW[i / square_size][j / square_size + 1][k] = BW(i, j + square_size, a, square_size);
          } else {
            sw = savedBW[i / square_size][j / square_size + 1][k];
          }
          if (savedBW[i / square_size + 1][j / square_size + 1][k] == -1) {
            se = BW(i + square_size, j + square_size, a, square_size);
            savedBW[i / square_size + 1][j / square_size + 1][k] = BW(i + square_size, j + square_size, a, square_size);
          } else {
            se = savedBW[i / square_size + 1][j / square_size + 1][k];
          }
          if (savedBW[i / square_size + 1][j / square_size][k] == -1) {
            ne = BW(i + square_size, j, a, square_size);
            savedBW[i / square_size + 1][j / square_size][k] = BW(i + square_size, j, a, square_size);
          } else {
            ne = savedBW[i / square_size + 1][j / square_size][k];
          }
          if (savedBW[i / square_size][j / square_size][k] == -1) {
            nw = BW(i, j, a, square_size);
            savedBW[i / square_size][j / square_size][k] = BW(i, j, a, square_size);
          } else {
            nw = savedBW[i / square_size][j / square_size][k];
          }
        }

        if (Math.abs(contours[k] - contourPerm[k]) < 0.001) {
          if (i == width - square_size && j == height - square_size) {
            whichSaved[k] = true;
            console.log(k);
          }
          //console.log(k);
          permSavedBW[i / square_size][j / square_size + 1][k] = sw;
          permSavedBW[i / square_size + 1][j / square_size + 1][k] = se;
          permSavedBW[i / square_size + 1][j / square_size][k] = ne;
          permSavedBW[i / square_size][j / square_size][k] = nw;
        }/* else if (i == width - square_size && j == height - square_size) {
          console.log(contours[k]);
          console.log(contourPerm[k]);
        }

        // nw --- ne
        // |       |
        // |       |
        // sw --- se


        // nw (0,0)
        // ne (1,0)
        // sw (0,1)
        // se (1,1)
        //
        // nw: fillTri(ctx, i, j, linterp(i, square_size, nw, ne), j, i, linterp(j, square_size, nw, sw));
        // ne: fillTri(ctx, linterp(i, square_size, nw, ne), j, i + square_size, linterp(j, square_size, ne, se), i + square_size, j);
        // se: fillTri(ctx, i + square_size, linterp(j, square_size, ne, se), linterp(i, square_size, sw, se), j + square_size, i + square_size, j + square_size);
        // sw: fillTri(ctx, i, linterp(j, square_size, nw, sw), linterp(i, square_size, se, sw), j + square_size, i, j + square_size);

        ctx.fillStyle = "rgb(255,255,255)";

        if (ne >= 1 && se >= 1 && sw >= 1 && nw >= 1) {
          ctx.fillRect(i, j, square_size, square_size);
        } else if (nw >= 1 && ne >= 1 && se >= 1 && sw < 1) {
          fillPent(ctx, i, j, i + square_size, j, i + square_size, j + square_size, linterp(i, square_size, sw, se), j + square_size, i, linterp(j, square_size, nw, sw));
        } else if (nw >= 1 && ne >= 1 && se < 1 && sw >= 1) {
          fillPent(ctx, i, j, i + square_size, j, i + square_size, linterp(j, square_size, ne, se), linterp(i, square_size, sw, se), j + square_size, i, j + square_size);
        } else if (nw >= 1 && ne >= 1 && se < 1 && sw < 1) {
          fillQuad(ctx, i, j, i + square_size, j, i + square_size, linterp(j, square_size, ne, se), i, linterp(j, square_size, nw, sw));
        } else if (nw >= 1 && ne < 1 && se >= 1 && sw >= 1) {
          fillPent(ctx, i, j, linterp(i, square_size, nw, ne), j, i + square_size, linterp(j, square_size, ne, se), i + square_size, j + square_size, i, j + square_size);
        } else if (nw >= 1 && ne < 1 && se >= 1 && sw < 1) {
          fillHex(ctx, i, j, linterp(i, square_size, nw, ne), j, i + square_size, linterp(j, square_size, ne, se), linterp(i, square_size, sw, se), j + square_size, i, linterp(j, square_size, nw, sw));
        } else if (nw >= 1 && ne < 1 && se < 1 && sw >= 1) {
          fillQuad(ctx, i, j, linterp(i, square_size, nw, ne), j, linterp(i, square_size, sw, se), j + square_size, i, j + square_size);
        } else if (nw >= 1 && ne < 1 && se < 1 && sw < 1) {
          fillTri(ctx, i, j, linterp(i, square_size, nw, ne), j, i, linterp(j, square_size, nw, sw));
        } else if (nw < 1 && ne >= 1 && se >= 1 && sw >= 1) {
          fillPent(ctx, linterp(i, square_size, nw, ne), j, i + square_size, j, i + square_size, j + square_size, i, j + square_size, i, linterp(j, square_size, nw, sw));
        } else if (nw < 1 && ne >= 1 && se >= 1 && sw < 1) {
          fillQuad(ctx, i + square_size, j, linterp(i, square_size, nw, ne), j, linterp(i, square_size, sw, se), j + square_size, i + square_size, j + square_size);
        } else if (nw < 1 && ne >= 1 && se < 1 && sw >= 1) {
          fillHex(ctx, linterp(i, square_size, nw, ne), j, i + square_size, j, i + square_size, linterp(j, square_size, ne, se), linterp(i, square_size, sw, se), j + square_size, i, j + square_size, i, linterp(j, square_size, nw, sw));
        } else if (nw < 1 && ne >= 1 && se < 1 && sw < 1) {
          fillTri(ctx, linterp(i, square_size, nw, ne), j, i + square_size, linterp(j, square_size, ne, se), i + square_size, j);
        } else if (nw < 1 && ne < 1 && se >= 1 && sw >= 1) {
          fillQuad(ctx, i, linterp(j, square_size, nw, sw), i, j + square_size, i + square_size, j + square_size, i + square_size, linterp(j, square_size, ne, se));
        } else if (nw < 1 && ne < 1 && se >= 1 && sw < 1) {
          fillTri(ctx, i + square_size, linterp(j, square_size, ne, se), linterp(i, square_size, sw, se), j + square_size, i + square_size, j + square_size);
        } else if (nw < 1 && ne < 1 && se < 1 && sw >= 1) {
          fillTri(ctx, i, linterp(j, square_size, nw, sw), linterp(i, square_size, sw, se), j + square_size, i, j + square_size);
        } else {
          contourOk[i / square_size][j / square_size][k] = false;
          break inner;
        }
      }
    }
  }*/


  /*for (var i = 0; i < width; i++) {
    for (var j = 0; j < width; j++) {
      for (var k = 0; k < contours; k++) {
        if (BW(i, j, 1 - 2/3 * k/contours) >= 1) {
          var factor = Math.floor(k / contours * 255);
          ctx.fillStyle = "rgb(" + factor + "," + factor + "," + factor + ")";
          ctx.fillRect(i, j, 1, 1);
        }
      }
    }
  }

  ctx.fillStyle = "red";
  for (var i = 0; i < width; i = i + square_size) {
    ctx.fillRect(i, 0, 1, height);
  }
  for (var i = 0; i < height; i = i + square_size) {
    ctx.fillRect(0, i, width, 1);
  }*/

  ctx.fillStyle = "red";

  for (var i = 0; i < width / square_size; i++) {
    for (var j = 0; j < height / square_size; j++) {
      ctx.fillRect(distorted[i][j][0], distorted[i][j][1], 1, 1);
    }
  }

  let style =  `
      background-image: url(${canvas.toDataURL()});
      background-repeat: no-repeat;
      background-size: 100%;
      background-color: #000`
  var img_tag = new Image();

  // when preload is complete, apply the image to the div
  img_tag.onload = function() {
      document.body.style = style;
  }
  // setting 'src' actually starts the preload
  img_tag.src = canvas.toDataURL();

  //setTimeout(function() { DrawStar(rand, time + 100); console.log(Date.now()); }, 40);
  setTimeout(function() { DrawGas(rand, time + 1000); }, 40);
}
