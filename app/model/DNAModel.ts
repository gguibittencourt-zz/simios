import sequelize, { Model } from 'sequelize';
import { ConfigSequelize } from '../config/sequelize/ConfigSequelize';
import { Constants } from '../utils/Util';

export class DNAModel extends Model {
  id: number;
  chain: string;
  isSimian: boolean;

  public static async createDNA(chain: string[], isSimian: boolean): Promise<object> {
    return await DNAModel.create({
      chain,
      is_simian: isSimian,
    });
  }

  public static async existsWithSameChain(chain: string[]): Promise<any> {
    return await ConfigSequelize.INSTANCE.sequelize.query(
      Constants.EXISTS_WITH_SAME_CHAIN_QUERY,
      { type: sequelize.QueryTypes.SELECT, plain: true, replacements: { chainDNA: JSON.stringify(chain) } });
  }

  public static async stats(): Promise<object> {
    return await ConfigSequelize.INSTANCE.sequelize.query(
      Constants.STATS_QUERY,
      { type: sequelize.QueryTypes.SELECT, plain: true });
  }
}
