const inquirer = require('inquirer');
const fs = require('fs');
const Shape = require('./lib/shapes');
const Triangle = require('./lib/triangle');
const Circle = require('./lib/circle');
const Square = require('./lib/square');

async function getUserInput() {
  const userInput = {};

  const textAnswer = await inquirer.prompt({
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for the logo text:',
    validate: (input) => input.length <= 3 || 'Please enter up to three characters.',
  });
  userInput.text = textAnswer.text;

  const textColorAnswer = await inquirer.prompt({
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (color keyword or hexadecimal number):',
  });
  userInput.textColor = textColorAnswer.textColor;

  const shapeAnswer = await inquirer.prompt({
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for the logo:',
    choices: ['circle', 'triangle', 'square'],
  });
  userInput.shape = shapeAnswer.shape;

  const shapeColorAnswer = await inquirer.prompt({
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (color keyword or hexadecimal number):',
  });
  userInput.shapeColor = shapeColorAnswer.shapeColor;

  return userInput;
}

function createSVGLogo(userInput) {
  let shape;

  switch (userInput.shape) {
    case 'circle':
      shape = new Circle();
      break;
    case 'triangle':
      shape = new Triangle();
      break;
    case 'square':
      shape = new Square();
      break;
    default:
      console.log('Invalid shape choice.');
      process.exit(1);
  }

  shape.setColor(userInput.shapeColor);

  const svgLogo = `
    <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shape.render()}
      <text x="150" y="125" font-family="Georgia" font-size="50" text-anchor="middle" fill="${userInput.textColor}">${userInput.text}</text>
    </svg>
  `;

  return svgLogo;
}

async function saveSVGToFile(svgLogo) {
  const filename = 'logo.svg';

  try {
    await fs.promises.writeFile(filename, svgLogo);
    console.log(`Generated ${filename}`);
  } catch (error) {
    console.error('Error saving the SVG file:', error);
  }
}

async function run() {
  try {
    const userInput = await getUserInput();
    const svgLogo = createSVGLogo(userInput);
    await saveSVGToFile(svgLogo);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

run();