import Texts from './texts';
import { ILoremConfig, ITextsConfig } from './types/lorem';
export * from './types/lorem';
class Lorem {
  public textsConfig?: ITextsConfig;
  readonly texts: Texts;
  constructor(config?: ILoremConfig) {
    this.texts = new Texts(config?.textsConfig);
  }
}

export default Lorem;
