import { Sequelize } from 'sequelize';
import { initModel } from './init.model';

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

  public async setupConnection() {
    if (this.sequelize) {
      return;
    }

    if (process.env.NODE_ENV === 'prod') {
      await this.setupAwsConnection();
    } else {
      this.sequelize = new Sequelize(`${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    }

    initModel(this.sequelize);
  }

  private async setupAwsConnection() {
    try {
      this.sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD, {
          host: process.env.DB_HOSTNAME,
          dialect: 'postgres',
        });
    } catch (e) {
      console.log(e);
      throw e;
    }
    console.log('Connected to RDS successfully');
  }
}
