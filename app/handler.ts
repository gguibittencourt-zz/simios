import { Handler } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import { DNAController } from './controller/DNAController';
import { ConfigSequelize } from './config/sequelize/ConfigSequelize';

const dotenvPath = path.join(__dirname, '../', `environments/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

const config = new ConfigSequelize();
config.setupConnection();

const dnaController = new DNAController();

export const isSimian: Handler = (event: any) => {
  return dnaController.isSimian(event);
};

export const stats: Handler = () => dnaController.stats();
