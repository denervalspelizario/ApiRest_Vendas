import { getCustomRepository } from "typeorm"; // metodo para pegar um repositorio customizado
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "../../../shared/http/error/AppError";

interface IResquest {
  id: string
}


// classe que tem como responsabilidade Deletar um produto
class DeleteProductService {
  public async execute({id}: IResquest): Promise<void>{

    const productsRepository = getCustomRepository(ProductRepository); // pegando o repositorio customizado


    // pegando um produto especifico(id) que tem em repository
    const product = await productsRepository.findOne(id);

    // validando
    if(!product){
      throw new AppError('Product not found')
    }

    // removendo o produto
    await productsRepository.remove(product);

  }
}


export default DeleteProductService;
