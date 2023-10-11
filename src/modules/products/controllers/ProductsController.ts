import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

// Controladores
export default class ProductsController {
  // listagem
  public async index(request: Request, response: Response): Promise<Response> {

    const listProducts = new ListProductService(); // instanciando a lista de produtos


    const products = await listProducts.execute(); // execute ativa a o metodo que neste caso lista os produtos e joga em products

    return response.json(products)
  }

  // mostrar um produto especifico
  public async show(request:Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({id});

    return response.json(product)

  }

  // criar um produto
  public async create(request:Request, response: Response): Promise<Response>{

    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      price,
      quantity
    });

    return response.json(product);
  }

  // atualizar um produto
  public async update(request:Request, response: Response): Promise<Response>{

    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductService(); // atualizando

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity
    })

    return response.json(product);
  }

  // deletar um produto especifico
  public async delete(request:Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({id});

    return response.json([])

  }

}


