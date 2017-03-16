var Source = require('./source');

module.exports = createDotsplay;

function createDotsplay(container) {
  return new Dotsplay(container);
}

function Dotsplay(container) {
  this.sourcesByType = {};
  this.container = container;
}

Dotsplay.prototype = {
  defineCircle: function(type, diameter) {
    var source = new Source(this.container);
    source.asCircle(diameter);
    this.sourcesByType[type] = source;
  },
  defineBox: function(type, width, height) {
    var source = new Source(this.container);
    source.asBox(width, height);
    this.sourcesByType[type] = source;
  },
  render: function(dots) {
    this.allSources().forEach(function(source) {
      source.reset();
    });

    // add dot to its source
    dots.forEach(function(dot) {
      this.sourceFor(dot).addDot(dot);
    }, this);

    // render all sources
    this.allSources().forEach(function(source) {
      source.render();
    });
  },
  allSources: function() {
    var sourcesByType = this.sourcesByType;
    return Object.keys(sourcesByType)
      .map(function(type) {
        return sourcesByType[type];
      });
  },
  sourceFor: function(dot) {
    return this.sourcesByType[dot.type] || noSuchType(dot);
  }
};

function noSuchType(dot) {
  throw new Error('No such type: ' + dot.type);
}
