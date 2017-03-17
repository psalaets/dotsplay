const Source = require('./source');

module.exports = createDotsplay;

function createDotsplay(container) {
  return new Dotsplay(container);
}

class Dotsplay {
  constructor(container) {
    this.sourcesByType = new Map();
    this.container = container;
  }

  defineCircle(type, diameter) {
    const source = new Source(this.container);
    source.asCircle(diameter);

    this.sourcesByType.set(type, source);
  }

  defineBox(type, width, height) {
    const source = new Source(this.container);
    source.asBox(width, height);

    this.sourcesByType.set(type, source);
  }

  render(dots) {
    for (let source of this.allSources()) {
      source.reset();
    }

    // add dot to its source
    for (let dot of dots) {
      this.sourceFor(dot).addDot(dot);
    }

    // render all sources
    for (let source of this.allSources()) {
      source.render();
    }
  }

  /**
  * @return Iterator<Source>
  */
  allSources() {
    return this.sourcesByType.values();
  }

  sourceFor(dot) {
    return this.sourcesByType.get(dot.type) || noSuchType(dot);
  }
}

function noSuchType(dot) {
  throw new Error('No such type: ' + dot.type);
}
