import { getCustomRepository } from "typeorm"; // metodo para pegar um repositorio customizado
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";


// classe que tem como responsabilidade Listar os produtos
class ListProductService {
  public async execute(): Promise<Product[]>{

    const productsRepository = getCustomRepository(ProductRepository); // pegando o repositorio customizado


    // pegando todos os produtos que tem em repository
    const products = await productsRepository.find();

    // retornando a list
    return products;
  }
}


export default ListProductService;
