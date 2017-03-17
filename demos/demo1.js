const createDotsplay = require('..');
const container = document.querySelector('.container');
const dotsplay = createDotsplay(container);

const spaceSize = 80;
let lightColor = 'lightgreen';

setInterval(function() {
  lightColor = randomColor();
  render();
}, 1000);

dotsplay.defineRect('space', spaceSize, spaceSize);

render();

function render() {
  dotsplay.render(makeDots());
}

function makeDots() {
  return [
    ...makeRow(0),
    ...makeRow(1),
    ...makeRow(2),
    ...makeRow(3),
    ...makeRow(4),
    ...makeRow(5),
    ...makeRow(6),
    ...makeRow(7)
  ];
}

function makeRow(row) {
  const colors = [lightColor, 'black'];
  if (row % 2 !== 0) colors.reverse();

  const spaces = [];

  for (let col = 0; col < 8; col++) {
    let color = colors[col % 2];
    spaces.push(makeSpace(color, row, col));
  }

  return spaces;
}

function makeSpace(color, row, col) {
  return {
    x: col * spaceSize,
    y: row * spaceSize,
    type: 'space',
    color
  };
}

function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
}
