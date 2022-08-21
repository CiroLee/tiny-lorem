import Color from '@src/lorem/color';

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
  test('rgb, return legency rgb color', () => {
    const result = color.rgb();
    expect(result.replace(/rgb\(|\)/g, '').split(',').length).toBe(3);
  });
  test('rgb, return modern rgb color', () => {
    const result = color.rgb('modern');
    expect(result.replace(/rgb\(|\)/g, '').split(' ').length).toBe(3);
  });
  test('rgba, return legency rgba color', () => {
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
  test('hsl, return legency hsl color', () => {
    const result = color.hsl();
    expect(result.replace(/hsl\(|\)/g, '').split(',').length).toBe(3);
  });
  test('hsl, return modern hsl color', () => {
    const result = color.hsl('modern');
    expect(result.replace(/hsl\(|\)/g, '').split(' ').length).toBe(3);
  });
  test('hsla, return legency hsla color', () => {
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
