import React from 'react'
import ReactDOM from 'react-dom'
import Srand from 'seeded-rand'

var running = false;

export function StartBackground () {
    if (typeof window != 'undefined'){
      var canvas = document.getElementById("stars");
      let style =  `
          background-image: url(${canvas.toDataURL()});
          background-repeat: no-repeat;
          background-size: 100% 100vh`

      document.body.style.background = style;
      if (window.sessionStorage.getItem('bg') === null) {
        window.sessionStorage.setItem('bg', Math.random() * 2147483647);
      }
      React.useEffect(() => {
          window.onbeforeunload = function() {
              window.sessionStorage.removeItem('bg');
              alert("");
          };
      }, []);
    }
    return;
}

function DrawStar (rand, bool) {
  running = true;
  var canvas = document.getElementById("stars");
  var ctx = canvas.getContext("2d");

  var width = ctx.canvas.clientWidth;
  var height = ctx.canvas.clientHeight;

  if (bool) {
    console.log(rand.random());
  }

  ctx.fillStyle = "rgba(" + Math.floor(rand.random() * 255) + ",0,0,0.1)";
  ctx.fillRect(0, 0, (width) * rand.random(), (height) * rand.random());
  let style =  `
      background-image: url(${canvas.toDataURL()});
      background-repeat: no-repeat;
      background-size: 100% 100vh`

  document.body.style = style;
  setTimeout(function() { DrawStar(rand, false); }, 1000);
}

export function DrawBackground () {
  if (typeof window != 'undefined'){
    var seed = window.sessionStorage.getItem('bg');
    var rand = new Srand();
    Srand.seed(seed);
    console.log(seed);
    if (!running) {
      DrawStar(rand, true);
    }
  }
}
