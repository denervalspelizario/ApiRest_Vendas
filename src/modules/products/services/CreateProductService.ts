import { getCustomRepository } from "typeorm"; // metodo para pegar um repositorio customizado
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "../../../shared/http/error/AppError";
import Product from "../typeorm/entities/Product";

// interface que vai tipar o parametro data
interface IResquest {
  name: string;
  price: number;
  quantity: number;
}

// classe que tem como responsabilidade criar o produto
class CreateProductService {
  public async execute({name, price, quantity}: IResquest): Promise<Product>{

    const productsRepository = getCustomRepository(ProductRepository); // pegando o repositorio customizado

    // verificando se o nome já existe
    const productExists = await productsRepository.findByName(name);

    // se nome já existe
    if(productExists){
      throw new AppError('There is already one product with this name')
    }


    // não tem produto duplicado então criando um objeto com os dados do repository
    const product = productsRepository.create({
      name,
      price,
      quantity
    });

    // criando e salvando o produto
    await productsRepository.save(product)

    return product;
  }
}


export default CreateProductService;
