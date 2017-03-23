const line = require('bresenham-line');
const timeRadians = require('time-radians');

const createDotsplay = require('..');
const container = document.querySelector('.container');
const dotsplay = createDotsplay(container);

const clockRadius = 300;
const clockAxis = {x: 350, y: 350};
const tickSize = 10;

dotsplay.defineRect('tick', tickSize, tickSize);
dotsplay.defineRect('seconds-hand', tickSize, tickSize);
dotsplay.defineRect('minutes-hand', tickSize, tickSize);
dotsplay.defineRect('hours-hand', tickSize, tickSize);

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
  let hoursRadians = timeRadians.hoursHand(date.getHours(), date.getMinutes());

  dots.push(...clockHand(clockAxis, clockRadius * 0.7, hoursRadians, 'black', 'hours-hand'));

  // minutes hand
  let minutesRadians = timeRadians.minutesHand(date.getMinutes(), date.getSeconds());

  dots.push(...clockHand(clockAxis, clockRadius, minutesRadians, 'black', 'minutes-hand'));

  // seconds hand
  let secondsRadians = timeRadians.secondsHand(date.getSeconds());

  dots.push(...clockHand(clockAxis, clockRadius, secondsRadians, 'red', 'seconds-hand'));

  // 1-12 markers
  dots.push(...clockFace);

  dotsplay.render(dots);
}

setInterval(function() {
  render(new Date());
}, 200);

function clockHand(start, radius, radians, color, type) {
  var end = endPoint(start, radius, radians);
  return [...line(start, end)]
    .filter((p, i) => i % tickSize === 0)
    .map(function(p, i) {
      return {
        x: p.x,
        y: p.y,
        color: color,
        type: type
      };
    });
}

function endPoint(start, radius, radians) {
  return {
    x: start.x + (radius * Math.cos(radians)),
    y: start.y - (radius * Math.sin(radians))
  };
}
