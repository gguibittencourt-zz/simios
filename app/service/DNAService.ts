import { DNAModel } from '../model/DNAModel';
import { ConfigSequelize } from '../config/sequelize/config.sequelize';
import sequelize from 'sequelize';

export class DNAService {

  private static readonly STATS_QUERY: string = `WITH w_stats as (
            select count(*) filter ( where is_simian )         as count_mutant_dna,
                   count(*) filter ( where is_simian = false ) as count_human_dna
            from dna
        )
        select count_mutant_dna, count_human_dna, round((count_human_dna::decimal / NULLIF(count_mutant_dna, 0)), 2) as ratio
        from w_stats`;

  /**
   * Is simian
   * @param params
   */
  protected async isSimians(params: any): Promise<object> {
    try {
      return await DNAModel.create({
        id: 1,
        chain: 'teste',
        is_simian: false,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Stats
   */
  protected async statss(): Promise<object> {
    try {
      return await ConfigSequelize.INSTANCE.sequelize.query(
        DNAService.STATS_QUERY,
        { type: sequelize.QueryTypes.SELECT });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
