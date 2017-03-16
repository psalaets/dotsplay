module.exports = Source;

function Source(container) {
  this.dots = [];
  this.element = createSource();

  container.appendChild(this.element);
}

Source.prototype = {
  asCircle: function(diameter) {
    this.element.style.width = px(diameter);
    this.element.style.height = px(diameter);
    this.element.style['border-radius'] = px(diameter);
    this.element.style.top = px(-diameter);
    this.yOffset = diameter;
  },
  asBox: function(width, height) {
    this.element.style.width = px(width);
    this.element.style.height = px(height);
    this.element.style.top = px(-height);
    this.yOffset = height;
  },
  addDot: function(dot) {
    this.dots.push(dot);
  },
  reset: function() {
    this.dots = [];
  },
  render: function() {
    if (this.dots.length > 0) {
      this.setBoxShadow(this.dots.map(function(dot) {
        return boxShadowValue(dot, this.yOffset);
      }, this).join(','));
    } else {
      this.setBoxShadow(null);
    }
  },
  setBoxShadow: function(value) {
    this.element.style['box-shadow'] = value;
  }
};

function px(value) {
  return value + 'px';
}

function boxShadowValue(dot, yOffset) {
  return `${dot.x}px ${dot.y + yOffset}px ${dot.color}`;
}

function createSource() {
  var source = document.createElement('div');
  source.style['background-color'] = 'transparent';
  source.style.position = 'absolute';
  return source;
}
