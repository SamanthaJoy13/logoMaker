const Shape = require('./shapes');

class Circle extends Shape {
  render() {
    return `<circle cx="150" cy="100" r="75" fill="${this.color}" />`;
  }
}

module.exports = Circle;
