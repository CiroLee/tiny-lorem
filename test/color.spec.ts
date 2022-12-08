import Color from '@src/lorem/color';
import { hexToRgb, rgbToHsl, hslToRgb, rgbToHex, extractRGB, extractHSL } from '@src/lorem/color';
const color = new Color();

describe('Color', () => {
  test('hex, return 6 digits color', () => {
    const result = color.hex();
    expect(result.substring(1).length).toBe(6);
  });
  test('hex, return 8 digits color', () => {
    const result = color.hex(true);
    expect(result.substring(1).length).toBe(8);
  });
  test('rgb, return legacy rgb color', () => {
    const result = color.rgb();
    expect(result.replace(/rgb\(|\)/g, '').split(',').length).toBe(3);
  });
  test('rgb, return modern rgb color', () => {
    const result = color.rgb('modern');
    expect(result.replace(/rgb\(|\)/g, '').split(' ').length).toBe(3);
  });
  test('rgba, return legacy rgba color', () => {
    const result = color.rgba();
    expect(result.replace(/rgba\(|\)/g, '').split(',').length).toBe(4);
  });
  test('rgba, return modern rgba color', () => {
    const result = color.rgba('modern');
    const rgbColor = result
      .replace(/rgb\(|\)/g, '')
      .split('/')[0]
      .trim()
      .split(' ');
    const alpha = result
      .replace(/rgb\(|\)/g, '')
      .split('/')[1]
      .trim();

    expect(rgbColor.length).toBe(3);
    expect(alpha.includes('%')).toBeTruthy();
  });
  test('hsl, return legacy hsl color', () => {
    const result = color.hsl();
    expect(result.replace(/hsl\(|\)/g, '').split(',').length).toBe(3);
  });
  test('hsl, return modern hsl color', () => {
    const result = color.hsl('modern');
    expect(result.replace(/hsl\(|\)/g, '').split(' ').length).toBe(3);
  });
  test('hsla, return legacy hsla color', () => {
    const result = color.hsla();
    expect(result.replace(/hsl\(|\)/g, '').split(',').length).toBe(4);
    expect(
      Number(
        result
          .replace(/hsl\(|\)/g, '')
          .split(',')[3]
          .trim(),
      ),
    ).not.toBeNaN();
  });
  test('hsla, return modern hsla color', () => {
    const result = color.hsla('modern');
    const hslColor = result
      .replace(/hsl\(|\)/g, '')
      .split('/')[0]
      .trim()
      .split(' ');
    const alpha = result
      .replace(/hsl\(|\)/g, '')
      .split('/')[1]
      .trim();
    expect(hslColor.length).toBe(3);
    expect(alpha.includes('%')).toBeTruthy();
  });
});
describe('color formula test', () => {
  test('extractRGB, param is not rgb color', () => {
    const color = 'rbg(255, 255, 255)';
    expect(() => {
      extractRGB(color);
    }).toThrowError();
  });
  test('extractRGB, legacy rgb color', () => {
    const color = 'rgb(255, 255, 255)';
    const result = extractRGB(color);
    expect(result).toEqual([255, 255, 255]);
  });
  test('extractRGB, modern rgb color', () => {
    const color = 'rgb(255 255 255 / 10%)';
    const result = extractRGB(color);
    expect(result).toEqual([255, 255, 255, 0.1]);
  });
  test('extractHSL, throw an error', () => {
    const color = 'rgb(0 0 0)';
    expect(() => {
      extractHSL(color);
    }).toThrowError();
  });
  test('extractHSL, legacy hsl color', () => {
    const color = 'hsl(245deg, 10%, 12%, 10%)';
    const result = extractHSL(color);
    expect(result).toEqual([245, 10, 12, 0.1]);
  });
  test('extractHSL, modern hsl color', () => {
    const color = 'hsl(245deg 10% 12% / 10%)';
    const result = extractHSL(color);
    expect(result).toEqual([245, 10, 12, 0.1]);
  });
  test('hexToRgb, param is not hex color', () => {
    const color = '0xffff000';
    expect(() => {
      hexToRgb(color);
    }).toThrowError();
  });
  test('hexToRgb, white color', () => {
    const color = '#fff';
    expect(hexToRgb(color)).toEqual([255, 255, 255]);
  });
  test('rgbToHex', () => {
    const color = 'rgb(2 255 255)';
    const result = rgbToHex(color);
    expect(result).toBe('#02ffff');
  });
  test('rgbToHsl', () => {
    const colors = [
      {
        rgb: 'rgb(255 255 255 / 10%)',
        hsl: [0, 0, 100, 0.1],
      },
      {
        rgb: 'rgb(255 0 0 / 10%)',
        hsl: [0, 100, 50, 0.1],
      },
      {
        rgb: 'rgb(0 255 0 / 10%)',
        hsl: [120, 100, 50, 0.1],
      },
      {
        rgb: 'rgb(0 0 255 / 10%)',
        hsl: [240, 100, 50, 0.1],
      },
    ];

    for (let i = 0, len = colors.length; i < len; i++) {
      expect(rgbToHsl(colors[i].rgb)).toEqual(colors[i].hsl);
    }
  });
  test('hslToRgb', () => {
    const color = 'hsla(120deg, 100%, 50%, 10%)';
    const reuslt = hslToRgb(color);
    expect(reuslt).toEqual([0, 255, 0, 0.1]);
  });
});
