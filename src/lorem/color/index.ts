/* eslint-disable no-unused-vars */
import RandomNumber from '../number';
const randomNumber = new RandomNumber();

export function extractRGB(rgb: string): number[] {
  let color: string[] = [];
  const rgbReg = /^(rgb|rgba|RGB|RGBA)/;
  const legacyMode = /,/g;
  const noSpaceReg = /(?:\(|\)|rgba|RGBA|RGB|rgb)|\s*/g;
  const withSpaceReg = /(?:\(|\)|rgba|RGBA|RGB|rgb)*/g;
  if (!rgbReg.test(rgb)) {
    throw new Error(`extractRGB: rgb is invalid rgb-format color`);
  }
  if (legacyMode.test(rgb)) {
    color = rgb.replace(noSpaceReg, '').split(',');
  } else {
    color = rgb
      .replace(withSpaceReg, '')
      .split(' ')
      .filter((item) => item !== '/' && item);
  }
  return color.map((item) => {
    return item.includes('%') ? Number(item.replace('%', '')) / 100 : Number(item);
  });
}

export function extractHSL(hsl: string): number[] {
  let color: string[] = [];
  const hslReg = /^(hsl|HSL|hsla|HSLA)/;
  const legacyMode = /,/g;
  const noSpaceReg = /(?:\(|\)|hsla|HSLA|hsl|HSL)|\s|deg*/g;
  const withSpaceReg = /(?:\(|\)|hsla|HSLA|hsl|HSL)|deg*/g;
  if (!hslReg.test(hsl)) {
    throw new Error(`extractHSL: hsl is invalid hsl-format color`);
  }
  if (legacyMode.test(hsl)) {
    color = hsl.replace(noSpaceReg, '').split(',');
  } else {
    color = hsl
      .replace(withSpaceReg, '')
      .split(' ')
      .filter((item) => item !== '/');
  }
  return color.map((item, index) => {
    return index === 3 && item.includes('%') ? Number(item.replace('%', '')) / 100 : Number(item.replace('%', ''));
  });
}
// hex <-> rgb
export function hexToRgb(hex: string): number[] {
  // hex color regex
  const hexReg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  let color = hex.toLowerCase();
  if (!hexReg.test(color)) {
    throw new Error(`hexToRgb: hex is invalid hex-format color`);
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
  const color: number[] = extractRGB(rgb).slice(0, 3); // exclude alpha

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
export function rgbToHsl(rgb: string): number[] {
  const color = extractRGB(rgb);

  let [r, g, b] = color;
  const a = color[3];
  r /= 255;
  g /= 255;
  b /= 255;
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
  const hsl = a ? [h, s * 100, l * 100, a] : [h, s * 100, l * 100];
  return hsl.map((item, index) => (index === 3 ? item : Math.round(item)));
}
// conversion formula is from https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
export function hslToRgb(hsl: string): number[] {
  const color = extractHSL(hsl);
  const s = color[1] / 100;
  const l = color[2] / 100;
  const alpha = color[3];

  const k = (n: number) => (n + color[0] / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const fn = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const hslVal = [255 * fn(0), 255 * fn(8), 255 * fn(4)].map(Math.round);
  return alpha ? [...hslVal, alpha] : hslVal;
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
   * @param type legacy | modern, default is legacy, modern is for css level4
   */
  rgb(type?: 'legacy' | 'modern'): string {
    const arr = new Array(3).fill(0).map(() => randomNumber.int([0, 255]));
    return type === 'modern' ? `rgb(${arr[0]} ${arr[1]} ${arr[2]})` : `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
  }
  /**
   * @desc return a random rgba color
   *  @param type legacy | modern, default is legacy, modern is for css level4
   */
  rgba(type?: 'legacy' | 'modern'): string {
    const alpha = randomNumber.float<number>({ range: [0, 1], fixed: 2 });

    const _rgb = this.rgb(type);
    return type === 'modern'
      ? _rgb.replace(/\)$/, ` / ${Math.round(alpha * 100)}%)`)
      : _rgb.replace(/\)$/, `, ${alpha})`);
  }
  /**
   * @desc return a random hsl color
   *  @param type legacy | modern, default is legacy, modern is for css level4
   */
  hsl(type?: 'legacy' | 'modern'): string {
    const hue = randomNumber.int([0, 360]);
    const saturation = `${randomNumber.int([0, 100])}%`;
    const lightness = `${randomNumber.int([0, 100])}%`;

    return type === 'modern' ? `hsl(${hue} ${saturation} ${lightness})` : `hsl(${hue}, ${saturation}, ${lightness})`;
  }
  /**
   * @desc return a random hsla color
   *  @param type legacy | modern, default is legacy, modern is for css level4
   */
  hsla(type?: 'legacy' | 'modern'): string {
    const alpha = randomNumber.float<number>({ range: [0, 1], fixed: 2 });
    const _hsl = this.hsl(type);
    return type === 'modern'
      ? _hsl.replace(/\)$/, ` / ${Math.round(alpha * 100)}%)`)
      : _hsl.replace(/\)$/, `, ${alpha})`);
  }
}
