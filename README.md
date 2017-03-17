# dotsplay

Using `box-shadow` to render shapes.

## Install

`$ npm install --save dotsplay`

## Usage

```js
const container = document.querySelector(...);
const dotsplay = require('dotsplay')(container);

// define dot types
dotsplay.defineCircle('small-dot', 20);
dotsplay.defineBox('big-rect', 50, 60);

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

## License

MIT
