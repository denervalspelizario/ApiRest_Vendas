import { Router } from "express";
import ProductsController from "../controllers/ProductsController";
import { celebrate, Joi, Segments } from "celebrate";// imports de validação

// As validações serão feitas diretamente nas rotas

const productsRouter = Router();

const productsController = new ProductsController();

// listando produtos
productsRouter.get('/', productsController.index);

// listando produto especifico
productsRouter.get('/:id',
  celebrate(
    {[Segments.PARAMS]: {               // validando o params o id tipo string e uuid  obrigatorio
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show
);

// adicionando produto
productsRouter.post('/',
  celebrate(
    {[Segments.BODY]: {                  // validando o body
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create
);

// atualizando produto
productsRouter.put('/:id',
  celebrate({
    [Segments.BODY]: {                  // validando o body
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {               // validando o params o id tipo string e uuid  obrigatorio
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.update
);

// deletando produto
productsRouter.delete('/:id',
  celebrate(
    {[Segments.PARAMS]: {               // validando o params o id tipo string e uuid  obrigatorio
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete
);


export default productsRouter;
