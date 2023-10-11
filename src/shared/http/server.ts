import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from './error/AppError';
import 'reflect-metadata';
import '@shared/typeorm';
import 'express-async-errors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(
  (
    error: Error, // recebe o erro
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    if(error instanceof AppError){ // se a instancia do error é da classe AppError no caso 400
     return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
     })
    }

    return response.status(500).json({ // se for um erro desconhecido então
      status: 'error',
      message: 'Internal server error'
    })
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333! 🏆🏆')
});



