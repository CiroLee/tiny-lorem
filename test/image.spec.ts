import RandomImage from '@src/lorem/image';
const image = new RandomImage();

describe('image', () => {
  test('placeholder set bgColor', () => {
    // white color
    const rgb = 'rgb(255 255 255)';
    const hex = '#ffffff';
    const hsl = 'hsl(0 0% 100%)';
    const resultArr = [
      image.placeholder({ bgColor: rgb, text: 'aaa' }),
      image.placeholder({ bgColor: hsl, text: 'aaa' }),
      image.placeholder({ bgColor: hex, text: 'aaa' }),
    ];

    resultArr.forEach((item) => {
      expect(item.includes('ffffff')).toBeTruthy();
      expect(item.includes('333333')).toBeTruthy();
    });
  });
  test('placeholder: set width and height', () => {
    const sizeArr = [{ width: 100 }, { height: 100 }, { width: 100, height: 200 }];
    expect(image.placeholder(sizeArr[0]).includes('100x100')).toBeTruthy();
    expect(image.placeholder(sizeArr[1]).includes('100x100')).toBeTruthy();
    expect(image.placeholder(sizeArr[2]).includes('100x200')).toBeTruthy();
  });
  test('picsum, with blur', () => {
    const result = image.picsum({ blur: 2 });
    expect(result.includes('blur=2')).toBeTruthy();
  });
  test('picsum, blur is not number', () => {
    expect(() => {
      image.picsum({ blur: '2' as unknown as number });
    }).toThrowError();
  });
  test('classify, with type', () => {
    const result = image.classify({ type: 'animals' });
    expect(result.endsWith('animals')).toBeTruthy();
  });
  test('classify, with lock', () => {
    const result = image.classify({ lock: true, type: 'animals' });
    expect(result.includes('lock=')).toBeTruthy();
  });
});
