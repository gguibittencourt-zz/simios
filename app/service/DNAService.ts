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
        const isSimianHorizontal = chainDNA.some((value: string) => Constants.REGEX_REPEATED.test(value));
        if (isSimianHorizontal) {
          await this.create(chainDNA, true);
          return true;
        }
        return true;
      }
      await this.create(chainDNA, false);
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
