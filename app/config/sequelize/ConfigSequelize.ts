import { DataTypes, Sequelize } from 'sequelize';
import { DNAModel } from '../../model/DNAModel';

export class ConfigSequelize {
  public static INSTANCE: ConfigSequelize = null;
  public sequelize: Sequelize = null;

  constructor() {
    if (!ConfigSequelize.INSTANCE) {
      ConfigSequelize.INSTANCE = this;
      return;
    }
    return ConfigSequelize.INSTANCE;
  }

  public async setupConnection(): Promise<void> {
    if (this.sequelize) {
      return;
    }
    try {
      this.sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD, {
          host: process.env.DB_HOSTNAME,
          dialect: 'postgres',
        });
      ConfigSequelize.initModel(this.sequelize);
    } catch (e) {
      throw e;
    }
  }

  private static initModel(sequelize: Sequelize): void {
    DNAModel.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
}
