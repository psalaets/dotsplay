# dotsplay

Use `box-shadow` to render shapes.

## Install

`$ npm install --save dotsplay`

## Usage

```js
const container = document.querySelector(...);
const createDotsplay = require('dotsplay');
const dotsplay = createDotsplay(container);

// define dot types
dotsplay.defineCircle('small-dot', 20);
dotsplay.defineRect('big-rect', 50, 60);

// make dots with position, color and type
const dots = [
  {
    x: 10,
    y: 250,
    color: '#00FF00',
    type: 'small-dot'
  },
  {
    x: 150,
    y: 200,
    color: 'blue',
    type: 'big-rect'
  }
];

// render dots
dotsplay.render(dots);
```

## Running the demos

```bash
$ git clone https://github.com/psalaets/dotsplay.git
$ cd dotsplay/demos
$ npm install
$ npm start
```

Then open browser to `http://localhost:8080`

## Gotchas

1. `container` passed to `createDotsplay()` will be given `position: relative` via inline style.

## License

MIT
