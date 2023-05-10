import Texts from '../texts';
import { BRANCHES } from './constant';
import { randomElement, randomInteger } from '@src/utils/utils';
const texts = new Texts();

export default class Develop {
  private sha(length: number): string {
    const str = '0123456789abcdefABCDEF';
    return texts.string({ range: length, source: str });
  }
  /**
   * @desc return a random git commit sha
   */
  gitCommitSha(): string {
    return this.sha(40);
  }
  /**
   * @desc return a random git commit short sha
   */
  gitCommitShortSha(): string {
    return this.sha(7);
  }
  /**
   * @desc return a random git branch
   */
  gitBranch(): string {
    return randomElement(BRANCHES);
  }
  version(): string {
    const major = randomInteger([0, 99]);
    const minor = randomInteger([0, 99]);
    const patch = randomInteger([0, 999]);
    return `${major}.${minor}.${patch}`;
  }
  /**
   * @desc return a random password
   * @param length length of password
   * @param strength strength of password, default is medium
   */
  password(length: number, strength: 'low' | 'medium' | 'high' = 'medium'): string {
    const low = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const medium = low + '!@#$%^&*()';
    const high = medium + '_+~`|}{[]\\:;?><,./-=';
    const strengthSets = { low, medium, high };
    if (!Object.prototype.hasOwnProperty.call(strengthSets, strength)) {
      throw new Error('invalid strength');
    }
    return texts.string({ range: length, source: strengthSets[strength] });
  }
  md5(): string {
    const str = '0123456789abcdef';
    return texts.string({ range: 32, source: str });
  }
}
