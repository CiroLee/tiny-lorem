import RandomNumber from '../number';
const randomNumber = new RandomNumber();
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
