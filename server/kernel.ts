import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import path from 'path';

import ApiError from './utils/ApiError';
import HttpStatusCode from './helpers/HttpsResponse';

import authRoute from './routes/auth.routes';
import walletRoute from './routes/wallet.routes';

import logs, { Logger } from './config/logger';
import globalErrorHandler from './helpers/globalErrorHandler';
import db from './database';

process.env.TZ = 'Africa/Lagos';

class Kernel {
  app: express.Application;

  constructor() {
    this.app = express();

    this.middlewares();

    this.webhooks();
    this.routes();
    this.errorHandler();
    this.databaseConnection();
  }

  middlewares() {
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.set('view engine', 'ejs');

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.set('PORT', process.env.PORT || 5500);
    this.app.set('NODE_ENV', process.env.NODE_ENV);
    this.app.use(morgan('combined', { stream: logs.stream }));

    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  webhooks() {}

  routes() {
    this.app.use('/api/auth', authRoute);
    this.app.use('/api/wallet', walletRoute);

    this.app.get('/home', (req, res, next) =>
      res.status(200).json({
        nessage: 'hello',
      }),
    );
  }

  errorHandler() {
    /**404 routes */
    this.app.all('*', (req, res, next) => {
      return next(
        new ApiError('Route not found', HttpStatusCode.HTTP_NOT_FOUND, {
          message:
            'The route you are looking for has been moved or does not exist',
        }),
      );
    });

    /**global error handler */
    this.app.use(globalErrorHandler);
  }

  databaseConnection() {
    (async () => {
      try {
        await db.raw('select 1');
        Logger.info('Knex connected to database - :)');
      } catch (error) {
        Logger.error(error);
      }
    })();
  }
}

export default new Kernel().app;
