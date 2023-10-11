import { getCustomRepository } from "typeorm"; // metodo para pegar um repositorio customizado
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "../../../shared/http/error/AppError";

interface IResquest {
  id: string
}


// classe que tem como responsabilidade Mostrar os dados de um produto
class ShowProductService {
  public async execute({id}: IResquest): Promise<Product>{

    const productsRepository = getCustomRepository(ProductRepository); // pegando o repositorio customizado


    // pegando um produto especifico(id) que tem em repository
    const product = await productsRepository.findOne(id);

    // validando
    if(!product){
      throw new AppError('Product not found')
    }

    // retornando o produto
    return product;
  }
}


export default ShowProductService;
