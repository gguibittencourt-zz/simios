import sequelize, { Model } from 'sequelize';
import { ConfigSequelize } from '../config/sequelize/ConfigSequelize';
import { Constants } from '../utils/Util';

export class DNAModel extends Model {

  /**
   * Create a DNA
   * @param {string[]} chain
   * @param {boolean} isSimian
   */
  public static async createDNA(chain: string[], isSimian: boolean): Promise<any> {
    return await DNAModel.create({
      chain,
      is_simian: isSimian,
    });
  }

  /**
   * Verify if exists a DNA with same chain
   * @param {string[]} chain
   */
  public static async existsWithSameChain(chain: string[]): Promise<any> {
    return await ConfigSequelize.INSTANCE.sequelize.query(
        Constants.EXISTS_WITH_SAME_CHAIN_QUERY,
        { type: sequelize.QueryTypes.SELECT, plain: true, replacements: { chainDNA: JSON.stringify(chain) } });
  }

  /**
   * Returns DNA verification statistics
   */
  public static async stats(): Promise<object> {
    return await ConfigSequelize.INSTANCE.sequelize.query(
      Constants.STATS_QUERY,
      { type: sequelize.QueryTypes.SELECT, plain: true });
  }
}
