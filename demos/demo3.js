const line = require('bresenham-line');

const createDotsplay = require('..');
const container = document.querySelector('.container');
const dotsplay = createDotsplay(container);

const clockRadius = 300;
const clockAxis = {x: 350, y: 350};
const tickSize = 10;

dotsplay.defineRect('tick', tickSize, tickSize);

const clockFace = [];

for (let i = 0; i < 12; i++) {
  let interval = 2 * Math.PI / 12;

  clockFace.push(Object.assign({}, {
    type: 'tick',
    color: 'black'
  }, endPoint(clockAxis, clockRadius, i * interval)));
}


function render(date) {
  let dots = [];

  // hours hand
  let totalMinutes = (date.getHours() - 12) * 60 + date.getMinutes();
  let hoursRadians = normalizedToRadians(totalMinutes / (12 * 60));

  dots.push(...clockHand(clockAxis, clockRadius * 0.7, hoursRadians, 'black'));

  // minutes hand
  let minutesRadians = normalizedToRadians(date.getMinutes() / 60);

  dots.push(...clockHand(clockAxis, clockRadius, minutesRadians, 'black'));

  // seconds hand
  let secondsRadians = normalizedToRadians(date.getSeconds() / 60);

  dots.push(...clockHand(clockAxis, clockRadius, secondsRadians, 'red'));

  // 1-12 markers
  dots.push(...clockFace);

  dotsplay.render(dots);
}

setInterval(function() {
  render(new Date());
}, 101);

// TODO become smarter and make this better
function normalizedToRadians(value) {
  if (value >= 0 && value < 0.25) {
    // top right
    return degreesToRadians(90) - degreesToRadians(90 * (value - 0) / 0.25);
  } else if (value >= 0.25 && value < 0.50) {
    // bottom right
    return degreesToRadians(360) - degreesToRadians(90 * (value - 0.25) / 0.25);
  } else if (value >= 0.50 && value < 0.75) {
    // bottom left
    return degreesToRadians(270) - degreesToRadians(90 * (value - 0.5) / 0.25);
  } else {
    // top left
    return degreesToRadians(180) - degreesToRadians(90 * (value - 0.75) / 0.25);
  }
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function clockHand(start, radius, radians, color) {
  var end = endPoint(start, radius, radians);
  return [...line(start, end)]
    .filter((p, i) => i % tickSize === 0)
    .map(function(p, i) {
      return {
        x: p.x,
        y: p.y,
        color: color,
        type: 'tick'
      };
    });
}

function endPoint(start, radius, radians) {
  return {
    x: start.x + (radius * Math.cos(radians)),
    y: start.y - (radius * Math.sin(radians))
  };
}
