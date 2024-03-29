/**
 * Build a response with data and statusCode
 * @param data
 * @param {number} statusCode
 */
export function buildResponse(data?: any, statusCode = 200) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify(data),
  };
}

/**
 * Build a response error with statusCode
 * @param {number} statusCode
 */
export function buildResponseError(statusCode = 403) {
  return buildResponse(undefined, statusCode);
}

export class Constants {
  public static readonly STATS_QUERY: string = `WITH w_stats as (
            select count(*) filter ( where is_simian )         as count_mutant_dna,
                   count(*) filter ( where is_simian = false ) as count_human_dna
            from dna
        )
        select COALESCE(count_mutant_dna, 0) as count_mutant_dna,
               COALESCE(count_human_dna, 0) as count_human_dna,
               COALESCE(round((count_mutant_dna::decimal / NULLIF(count_human_dna, 0)), 2), 0) as ratio
        from w_stats`;
  public static readonly EXISTS_WITH_SAME_CHAIN_QUERY: string = 'select exists(select 1 from dna where chain::text = :chainDNA);';
  public static readonly REGEX_CHECK_ELEMENTS: RegExp = new RegExp('(?![ATGC]).');
  public static readonly REGEX_REPEATED: RegExp = new RegExp('([ATCG])\\1{3}');
  public static readonly MINIMUM_LENGTH: number = 4;
}
