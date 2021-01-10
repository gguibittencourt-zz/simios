import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';

const dotenvPath = path.join(__dirname, '../', `environments/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

import { DNAController } from './controller/DNAController';
import { ConfigSequelize } from './config/sequelize/config.sequelize';

const config = new ConfigSequelize();
config.setupConnection();

const dnaController = new DNAController();

export const isSimian: Handler = (event: any, context: Context) => {
  return dnaController.isSimian(event, context);
};

export const stats: Handler = () => dnaController.stats();
