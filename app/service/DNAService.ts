import { DNAModel } from '../model/DNAModel';
import { ConfigSequelize } from '../config/sequelize/config.sequelize';
import sequelize from 'sequelize';
import { Constants } from '../utils/Util';

export class DNAService {

  /**
   * Is simian
   * @param chainDNA
   */
  public async isSimian(chainDNA: string[]): Promise<boolean> {
    try {
      const isValid: boolean = this.isValid(chainDNA);
      if (isValid) {
        let isSimian: boolean = chainDNA.some((value: string) => Constants.REGEX_REPEATED.test(value));
        if (!isSimian) {
          isSimian = DNAService.diagonalCalculate(chainDNA);
        }
        if (!isSimian) {
          isSimian = DNAService.diagonalCalculate(chainDNA, true);
        }
        await this.create(chainDNA, isSimian);
        return isSimian;
      }
      return false;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Stats
   */
  public async stats(): Promise<object> {
    try {
      return await ConfigSequelize.INSTANCE.sequelize.query(
        Constants.STATS_QUERY,
        { type: sequelize.QueryTypes.SELECT });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * diagonalCalculate
   */
  private static diagonalCalculate(chainDNA: string[], bottomToTop?: boolean): boolean {
    const length = chainDNA.length;
    for (let k = 0; k <= 2 * (length - 1); k += 1) {
      const temp: string[] = [];
      for (let y = length - 1; y >= 0; y -= 1) {
        const x = k - (bottomToTop ? length - y : y);
        if (x >= 0 && x < length) {
          temp.push(chainDNA[y][x]);
        }
      }
      if (temp.length > 3) {
        const isSimian: boolean = Constants.REGEX_REPEATED.test(temp.join(''));
        if (isSimian) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Stats
   */
  private async create(chain: string[], isSimian: boolean): Promise<object> {
    try {
      return  await DNAModel.create({
        chain: JSON.stringify(chain),
        is_simian: isSimian,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * isValid
   * @param chainDNA
   */
  private isValid(chainDNA: string[]): boolean {
    if (!chainDNA || !chainDNA.length) {
      return false;
    }
    return !chainDNA.some((value: string) => Constants.REGEX.test(value) || value.length !== chainDNA.length);
  }
}
