import { DNAModel } from '../model/DNAModel';
import { Constants } from '../utils/Util';

export class DNAService {

  /**
   * Verify if a DNA belongs to a human or simian
   * @param {string[]} chainDNA
   */
  public static async isSimian(chainDNA: string[]): Promise<boolean> {
    try {
      const isValid: boolean = await this.isValid(chainDNA);
      if (isValid) {
        let isSimian = DNAService.hasRepeatedElements(chainDNA);
        if (!isSimian) {
          isSimian = DNAService.hasRepeatedElements(chainDNA, true);
        }
        const { exists } = await DNAModel.existsWithSameChain(chainDNA);
        if (!exists) {
          await DNAModel.createDNA(chainDNA, isSimian);
        }
        return isSimian;
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Returns a DNA verification statistics
   */
  public static async stats(): Promise<object> {
    return await DNAModel.stats();
  }

  /**
   * Verify if has any horizontal or diagonal or vertical with four or more repeated elements in a chain DNA
   * @param {string[]} chainDNA
   * @param {boolean} bottomToTop
   */
  private static hasRepeatedElements(chainDNA: string[], bottomToTop?: boolean): boolean {
    const isSimian: boolean = chainDNA.some((value: string) => Constants.REGEX_REPEATED.test(value));
    if (isSimian) {
      return isSimian;
    }
    const length: number = chainDNA.length;
    for (let k = 0; k <= 2 * (length - 1); k += 1) {
      const tempVertical: string[] = [];
      const tempDiagonal: string[] = [];
      for (let y: number = length - 1; y >= 0; y -= 1) {
        if (k >= 0 && k < length && !bottomToTop) {
          tempVertical.push(chainDNA[y][k]);
        }
        const x: number = k - (bottomToTop ? length - y : y);
        if (x >= 0 && x < length) {
          tempDiagonal.push(chainDNA[y][x]);
        }
      }
      if (tempDiagonal.length >= Constants.MINIMUM_LENGTH || tempVertical.length >= Constants.MINIMUM_LENGTH) {
        const isSimian: boolean = Constants.REGEX_REPEATED.test(tempDiagonal.join('')) || Constants.REGEX_REPEATED.test(tempVertical.join(''));
        if (isSimian) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Verify if a chain DNA is valid
   * @param {string[]} chainDNA
   */
  private static async isValid(chainDNA: string[]): Promise<boolean> {
    if (!chainDNA || chainDNA.length < Constants.MINIMUM_LENGTH) {
      return false;
    }
    return !chainDNA.some((value: string) => Constants.REGEX_CHECK_ELEMENTS.test(value) || value.length !== chainDNA.length);
  }
}
