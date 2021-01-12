export const stats = {
  count_mutant_dna: 1,
  count_human_dna: 0,
  ratio: 0.00,
};

export const createDNA = {
  id: 1,
  chain: '["ATGCGA", "CAGTGC", "TTATGT", "AGAATG", "GCCCTA", "TCACTG"]',
  is_simian: true,
};

export const existsWithSameChain = {
  exists: true,
};

export const notExistsWithSameChain = {
  exists: false,
};

export const createError = new Error('E11000 duplicate key error collection: study1.books index: id_1 dup key: { id: 30247892 }');
