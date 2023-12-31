import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'; // essa porra TEM que ficar em baixo dessa porra de express
import cors from 'cors';
import routes from './routes';
import AppError from './error/AppError';
import 'reflect-metadata';
import '@shared/typeorm';
import { errors } from 'celebrate'; // para o ceçebrate funcionar precisa desse import


const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors()); // import da biblioteca celebrate para funcionar a validação seguindo a documentação

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



