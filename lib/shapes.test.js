const Shape = require('./shapes');
const Triangle = require('./triangle');
const Circle = require('./circle');
const Square = require('./square');

describe('Shape class', () => {
  it('should set the color correctly', () => {
    const shape = new Shape();
    shape.setColor('red');
    expect(shape.color).toBe('red');
  });

  it('should render an empty string', () => {
    const shape = new Shape();
    expect(shape.render()).toBe('');
  });
});

describe('Triangle class', () => {
  it('should render the SVG string for a blue triangle', () => {
    const triangle = new Triangle();
    triangle.setColor('blue');
    expect(triangle.render()).toBe('<polygon points="150,18 244,182 56,182" fill="blue" />');
  });
});

describe('Circle class', () => {
  it('should render the SVG string for a green circle', () => {
    const circle = new Circle();
    circle.setColor('green');
    expect(circle.render()).toBe('<circle cx="150" cy="100" r="75" fill="green" />');
  });
});

describe('Square class', () => {
  it('should render the SVG string for a yellow square', () => {
    const square = new Square();
    square.setColor('yellow');
    expect(square.render()).toBe('<rect x="50" y="50" width="200" height="200" fill="yellow" />');
  });
});
