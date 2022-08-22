/* eslint-disable no-unused-vars */
import RandomNumber from '../number';
const randomNumber = new RandomNumber();

function extractRGB(rgb: string): number[] {
  let color: string[] = [];
  const rgbReg = /^(rgb|RGB)/;
  const legencyMode = /,/g;
  const noSpaceReg = /(?:\(|\)|rgb|RGB)|\s*/g;
  const withSpaceReg = /(?:\(|\)|rgb|RGB)*/g;
  if (!rgbReg.test(rgb)) {
    throw new Error(`extractRGB: param ${rgb} is invalid rgb-format color`);
  }
  if (legencyMode.test(rgb)) {
    color = rgb.replace(noSpaceReg, '').split(',');
  } else {
    color = rgb
      .replace(withSpaceReg, '')
      .split(' ')
      .filter((item) => item !== '/');
  }
  return color.map((item) => {
    return item.includes('%') ? Number(item.replace('%', '')) / 100 : Number(item);
  });
}

function extractHSL(hsl: string): number[] {
  let color: string[] = [];
  const hslReg = /^(hsl|HSL)/;
  const legencyMode = /,/g;
  const noSpaceReg = /(?:\(|\)|hsl|HSL)|\s|deg|%*/g;
  const withSpaceReg = /(?:\(|\)|hsl|HSL)|deg|%*/g;
  if (!hslReg.test(hsl)) {
    throw new Error(`extractHSL: param ${hsl} is invalid hsl-format color`);
  }
  if (legencyMode.test(hsl)) {
    color = hsl.replace(noSpaceReg, '').split(',');
  } else {
    console.log('modern');
    color = hsl.replace(withSpaceReg, '').split(' ');
  }

  return color.map(Number);
}
// hex <-> rgb
export function hexToRgb(hex: string): number[] {
  // hex color regex
  const hexReg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  let color = hex.toLowerCase();
  if (!hexReg.test(color)) {
    throw new Error(`hexToRgb: param ${hex} is invalid hex-format color`);
  }
  // fill to 6 dgits e.g. #fff --> #ffffff
  if (color.length === 4) {
    color = '#' + color.slice(1).repeat(2);
  }
  const rgb: number[] = [];
  for (let i = 1; i < 7; i += 2) {
    const c = parseInt('0x' + color.slice(i, i + 2));
    rgb.push(c);
  }
  return rgb;
}
export function rgbToHex(rgb: string) {
  let hex = '#';
  const color: number[] = extractRGB(rgb);

  for (let i = 0, len = color.length; i < len; i++) {
    let _hex = color[i].toString(16);
    if (_hex.length === 1) {
      _hex = '0' + _hex;
    }
    hex += _hex;
  }
  return hex;
}
// rgb <-> hsl
// conversion formula is from https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
function rgbToHsl(rgb: string): number[] {
  const color = extractRGB(rgb);
  const [r, g, b] = color.map((item) => item / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const mid = (min + max) / 2;
  let h = mid;
  let s = mid;
  const l = mid;
  if (min === max) {
    h = 0;
    s = 0;
  } else {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }

    h *= 60;
  }

  return [h, s * 100, l * 100].map(Math.round);
}
// conversion formula is from https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
export function hslToRgb(hsl: string): number[] {
  const color = extractHSL(hsl);
  const s = color[1] / 100;
  const l = color[2] / 100;

  const k = (n: number) => (n + color[0] / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const fn = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return [255 * fn(0), 255 * fn(8), 255 * fn(4)].map(Math.round);
}
export default class Color {
  /**
   * @desc return a random hex color
   * @param alpha [optional] alpha = true, will return a 8 digits hex color with alpha
   */
  hex(alpha?: boolean): string {
    const len = alpha ? 8 : 6;
    let _hex = '#';
    for (let i = 0; i < len; i++) {
      _hex += parseInt(String(Math.random() * 16)).toString(16);
    }
    return _hex;
  }
  /**
   * @desc return a random rgb color
   * @param type legency | modern, default is legency, modern is for css level4
   */
  rgb(type?: 'legency' | 'modern') {
    const arr = new Array(3).fill(randomNumber.int([0, 255]));
    return type === 'modern' ? `rgb(${arr[0]} ${arr[1]} ${arr[2]})` : `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
  }
  /**
   * @desc return a random rgba color
   *  @param type legency | modern, default is legency, modern is for css level4
   */
  rgba(type?: 'legency' | 'modern') {
    const alpha = randomNumber.float({ range: [0, 1], fixed: 2 }) as number;

    const _rgb = this.rgb(type);
    return type === 'modern'
      ? _rgb.replace(/\)$/, ` / ${Math.round(alpha * 100)}%)`)
      : _rgb.replace(/\)$/, `, ${alpha})`);
  }
  /**
   * @desc return a random hsl color
   *  @param type legency | modern, default is legency, modern is for css level4
   */
  hsl(type?: 'legency' | 'modern') {
    const hue = randomNumber.int([0, 360]);
    const saturation = `${randomNumber.int([0, 100])}%`;
    const lightness = `${randomNumber.int([0, 100])}%`;

    return type === 'modern' ? `hsl(${hue} ${saturation} ${lightness})` : `hsl(${hue}, ${saturation}, ${lightness})`;
  }
  /**
   * @desc return a random hsla color
   *  @param type legency | modern, default is legency, modern is for css level4
   */
  hsla(type?: 'legency' | 'modern') {
    const alpha = randomNumber.float({ range: [0, 1], fixed: 2 }) as number;
    const _hsl = this.hsl(type);
    return type === 'modern'
      ? _hsl.replace(/\)$/, ` / ${Math.round(alpha * 100)}%)`)
      : _hsl.replace(/\)$/, `, ${alpha})`);
  }
}
