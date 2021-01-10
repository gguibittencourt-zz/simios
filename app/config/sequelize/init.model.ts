import { DNAModel } from '../../model/DNAModel';
import { DataTypes, Sequelize } from 'sequelize';

export function initModel(sequelize: Sequelize) {
  DNAModel.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    chain: DataTypes.JSON,
    is_simian: DataTypes.BOOLEAN,
  },            {
    sequelize,
    tableName: 'dna',
    createdAt: false,
    updatedAt: false,
  });
}
