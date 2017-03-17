const p2 = require('p2');
const createDotsplay = require('..');
const container = document.querySelector('.container');
const dotsplay = createDotsplay(container);

const marbleRadius = 5;
const envRadius = 100;

dotsplay.defineCircle('marble', marbleRadius * 2);
dotsplay.defineCircle('env', envRadius * 2);

const dots = [
  makeEnvDot(200, 200, envRadius),
  makeEnvDot(500, 200, envRadius),
  makeEnvDot(350, 400, envRadius),
  makeEnvDot(150, 600, envRadius),
  makeEnvDot(550, 600, envRadius),
  ...makeMarbleDotRow(220, 480, 20, 0, marbleRadius),
  ...makeMarbleDotRow(220, 480, 20, -20, marbleRadius),
  ...makeMarbleDotRow(220, 480, 20, -40, marbleRadius),
  ...makeMarbleDotRow(220, 480, 20, -60, marbleRadius),
  ...makeMarbleDotRow(220, 480, 20, -80, marbleRadius),
  ...makeMarbleDotRow(220, 480, 20, -100, marbleRadius),
];

const world = new p2.World({
  gravity: [0, 5]
});

for (let dot of dots) {
  world.addBody(dot.body);
}

// animate loop is straight outta p2 World docs
requestAnimationFrame(animate);

let lastTimeSeconds;
function animate(t) {
  requestAnimationFrame(animate);
  let timeSeconds = t / 1000;
  lastTimeSeconds = lastTimeSeconds || timeSeconds;

  let deltaTime = timeSeconds - lastTimeSeconds;
  world.step(1 / 60, deltaTime, 10);

  updateDotPositions(dots);
  dotsplay.render(dots);
  resetMarbles(dots);
}

function resetMarbles(dots) {
  for (let dot of dots) {
    if (dot.type === 'marble') {
      let y = dot.body.position[1];
      if (y > 1000) {
        dot.body.position[1] = 0;
      }
    }
  }
}

function updateDotPositions(dots) {
  for (let dot of dots) {
    let body = dot.body;
    let circle = body.shapes[0];
    dot.x = body.position[0] - circle.radius;
    dot.y = body.position[1] - circle.radius;
  }
}

function makeMarbleDotRow(firstX, lastX, inteval, y, r) {
  const dots = [];

  for (let x = firstX; x <= lastX; x += inteval) {
    dots.push(makeMarbleDot(x, y, r));
  }

  return dots;
}

function makeMarbleDot(x, y, r) {
  return {
    body: makeMarbleBody(x, y, r),
    type: 'marble',
    color: 'orange'
  };
}

function makeMarbleBody(x, y, r) {
  const marble = new p2.Body({
    position: [x, y],
    mass: 10
  });

  marble.addShape(new p2.Circle({
    radius: r
  }));

  return marble;
}

function makeEnvDot(x, y, r) {
  return {
    body: makeEnvBody(x, y, r),
    type: 'env',
    color: 'gray'
  };
}

function makeEnvBody(x, y, r) {
  const env = new p2.Body({
    position: [x, y],
    mass: 0
  });

  env.addShape(new p2.Circle({
    radius: r
  }));

  return env;
}
