class Source {
  constructor(container) {
    this.dots = [];
    this.element = createElement();

    container.appendChild(this.element);
  }

  asCircle(diameter) {
    this.element.style.width = px(diameter);
    this.element.style.height = px(diameter);
    this.element.style['border-radius'] = px(diameter);
    this.element.style.top = px(-diameter);

    this.yOffset = diameter;
  }

  asBox(width, height) {
    this.element.style.width = px(width);
    this.element.style.height = px(height);
    this.element.style.top = px(-height);

    this.yOffset = height;
  }

  addDot(dot) {
    this.dots.push(dot);
  }

  reset() {
    this.dots = [];
  }

  render() {
    if (this.dots.length > 0) {
      this.setBoxShadow(
        this.dots.map(dot => boxShadowValue(dot, this.yOffset)).join(',')
      );
    } else {
      this.setBoxShadow(null);
    }
  }

  setBoxShadow(value) {
    this.element.style['box-shadow'] = value;
  }
}

function px(value) {
  return value + 'px';
}

function boxShadowValue(dot, yOffset) {
  return `${dot.x}px ${dot.y + yOffset}px ${dot.color}`;
}

function createElement() {
  const source = document.createElement('div');
  source.style['background-color'] = 'transparent';
  source.style.position = 'absolute';
  return source;
}

module.exports = Source;
