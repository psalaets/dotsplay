var createDotsplay = require('.');

var container = document.querySelector('.container')
container.style.height = '500px';
container.style.position = 'relative';

var dots = [
  {
    x: 10,
    y: 250,
    color: 'green',
    type: 'small-dot'
  },
  {
    x: 150,
    y: 200,
    color: 'green',
    type: 'big-dot'
  }
];

var blueX = 100;
for (let i = 0; i < 10; i++) {
  dots.push({
    x: blueX + i * 10,
    y: blueX + i * 15,
    color: i % 2 === 0 ? 'blue' : 'red',
    type: 'small-rect'
  });
}

var dotsplay = createDotsplay(container);

dotsplay.defineCircle('big-dot', 30);
dotsplay.defineCircle('small-dot', 20);
dotsplay.defineBox('small-rect', 10, 15);

function render() {
  dotsplay.render(dots);

  dots.filter(d => d.type === 'small-rect')
    .forEach(d => {
      d.x += 10;
      if (d.x > 500) d.x = 0;
    });

  requestAnimationFrame(render);
}

render();
