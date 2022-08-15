import Texts from './lorem/texts';
import number from './lorem/number';
import { ILoremConfig, ITextsConfig } from './types/lorem';
export * from './types/lorem';
class Lorem {
  public textsConfig?: ITextsConfig;
  readonly texts: Texts;
  constructor(config?: ILoremConfig) {
    this.texts = new Texts(config?.textsConfig);
  }

  readonly number = number;
}

export default Lorem;
