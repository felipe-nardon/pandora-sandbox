import * as React from 'react';

export function scoreGenerator() {
  const min = 10;
  const max = 90;
  return Math.floor(Math.random() * (max - min) + min);
}

export function goalScoreGenerator() {
  const min = 50;
  const max = 95;
  return Math.floor(Math.random() * (max - min) + min);
}

export function scoreVariation(score: number) {
  const min = score * 0.7;
  let max = score * 1.3;
  if (max > 100.0) max = 100;
  const [variation] = React.useState(
    Math.floor(Math.random() * (max - min) + min)
  );
  return variation;
}

export function dataGenerator(score: number) {
  const [max] = React.useState(Math.floor(Math.random() * (4 - 1)) + 1);
  const data = [];
  for (let i = 0; i < max; i++) {
    data.push({ name: `Item ${i + 1}`, value: scoreVariation(score) });
  }
  return data;
}

export function percentageToColor(percentage: number) {
  let s = 1;
  let l = 0.5;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((percentage / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= percentage && percentage < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= percentage && percentage < 360) {
    r = x;
    g = c;
    b = 0;
  }
  // Having obtained RGB, convert channels to hex
  let red = Math.round((r + m) * 255).toString(16);
  let green = Math.round((g + m) * 255).toString(16);
  let blue = Math.round((b + m) * 255).toString(16);
  let alpha = Math.round(0.7 * 255).toString(16);

  // Prepend 0s, if necessary
  if (red.length == 1) red = `0${red}`;
  if (green.length == 1) green = `0${green}`;
  if (blue.length == 1) blue = `0${blue}`;

  return `#${red}${green}${blue}${alpha}`;
}
