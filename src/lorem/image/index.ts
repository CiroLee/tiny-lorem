import Color, { hexToRgb, rgbToHsl, rgbToHex, extractHSL, hslToRgb } from '../color';
import { buildQueryString, randomInteger } from '@src/utils/utils';
import type { IImagePlaceholderOptions, IImagePicsumOptions } from '@src/types/lorem.types';
const color = new Color();

export default class RandomImage {
  private PLACEHOLDER_IMAGE_DOMAIN = 'https://dummyimage.com';
  private PICURM_IMAGE_DOMAIN = 'https://picsum.photos';
  private colorType(color: string): string {
    return /^#/.test(color) ? 'hex' : color.toLowerCase().slice(0, 3);
  }
  private toHSL(color: string): number[] {
    let hsl: number[] = [];
    const type = this.colorType(color);
    if (type === 'hex') {
      const rgb = `rgb(${hexToRgb(color).join(',')})`;
      hsl = rgbToHsl(rgb);
    } else if (type === 'rgb') {
      hsl = rgbToHsl(color);
    } else {
      hsl = extractHSL(color);
    }

    return hsl;
  }
  private toHex(color: string): string {
    let hex = '';
    const type = this.colorType(color);
    if (type === 'hex') {
      hex = color;
    } else if (type === 'rgb') {
      hex = rgbToHex(color);
    } else {
      const rgb = `rgb(${hslToRgb(color).join(',')})`;
      hex = rgbToHex(rgb);
    }

    return hex;
  }
  private isDark(color: string): boolean {
    const [, , lightness] = this.toHSL(color);
    return lightness < 50;
  }
  private initSize(size: Pick<IImagePlaceholderOptions, 'width' | 'height'>) {
    const _size = {
      width: randomInteger([320, 1024]),
      height: randomInteger([320, 1024]),
    };

    if (size?.width && !size?.height) {
      _size.width = size.width;
      _size.height = size.width;
    } else if (!size?.width && size?.height) {
      _size.width = size.height;
      _size.height = size.height;
    } else if (size?.width && size?.height) {
      _size.width = size.width;
      _size.height = size.height;
    }

    return _size;
  }
  /**
   * @desc return a random pure color image
   * @param options.width [optional] image width
   * @param options.height [optional] image height
   * @param options.bgColor [optional] image background-color
   * @param options.fontColor [optional] image font-color while set is set
   * if not set , font-color will be set by bgColor
   * @param options.text [optional] image text
   */
  placeholder(options?: IImagePlaceholderOptions): string {
    const bgColor = options?.bgColor || color.hsl();
    const hexBgColor = this.toHex(bgColor).slice(1);
    const isDarkColor = this.isDark(bgColor);
    const fontColor = options?.fontColor ? this.toHex(options.fontColor).slice(1) : isDarkColor ? 'ffffff' : '333333';

    const size = this.initSize({ width: options?.width, height: options?.height });
    const imageUrl = `${this.PLACEHOLDER_IMAGE_DOMAIN}/${size.width}x${size.height}/${hexBgColor}`;

    return options?.text ? `${imageUrl}/${fontColor}&text=${options.text}` : imageUrl;
  }
  /**
   * @desc return a random true picture
   * @param options.width [optional] image width
   * @param options.height [optional] image height
   * @param options.grayscale [optional] get a grayscale image while set true
   * @param options.blur [optional] get a blurred image white set between 1 and 10
   */
  picsum(options?: IImagePicsumOptions): string {
    const size = this.initSize({ width: options?.width, height: options?.height });
    if (options?.blur && typeof options.blur !== 'number') {
      throw new Error(`picsum: blur must be a number`);
    }
    const baseUrl = `${this.PICURM_IMAGE_DOMAIN}/${size.width}/${size.height}`;

    const params = buildQueryString({
      grayscale: options?.grayscale,
      blur: options?.blur,
      random: options?.random ? randomInteger([999, 99999]) : false,
    });
    return `${baseUrl}${params}`;
  }
}
