import { Model } from 'sequelize';

export class DNAModel extends Model {
  id: number;
  chain: string;
  isSimian: boolean;
}
