import Texts from './lorem/texts';
import RandomNumber from './lorem/number';
import RandomDate from './lorem/date';
import { ILoremConfig, ITextsConfig } from './types/lorem.types';
export * from './types/lorem.types';
class Lorem {
  public textsConfig?: ITextsConfig;
  readonly texts: Texts;
  constructor(config?: ILoremConfig) {
    this.texts = new Texts(config?.textsConfig);
  }

  readonly number = new RandomNumber();
  readonly date = new RandomDate();
}

export default Lorem;
