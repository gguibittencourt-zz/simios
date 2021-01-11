export function buildResponse(data?: any, statusCode = 200) {
  return {
    statusCode,
    body: JSON.stringify(data),
  };
}

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
               COALESCE(round((count_human_dna::decimal / NULLIF(count_mutant_dna, 0)), 2), 0) as ratio
        from w_stats`;
  public static readonly REGEX: RegExp = new RegExp('(?![ATGC]).');
  public static readonly REGEX_REPEATED: RegExp = new RegExp('([ATCG])\\1{3}');
}
