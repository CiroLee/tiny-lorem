import Texts from './lorem/texts';
import RandomNumber from './lorem/number';
import RandomDate from './lorem/date';
import Address from './lorem/address';
import Internet from './lorem/internet';
import Color from './lorem/color';
import RandomImage from './lorem/image';
import Helper from './lorem/helper';
class TinyLorem {
  readonly texts = new Texts();
  readonly number = new RandomNumber();
  readonly date = new RandomDate();
  readonly address = new Address();
  readonly internet = new Internet();
  readonly color = new Color();
  readonly image = new RandomImage();
  readonly helper = new Helper();
}
export * from './types/lorem.types';
export default TinyLorem;

const lorem = new TinyLorem();

console.log(lorem.address.county(false));
