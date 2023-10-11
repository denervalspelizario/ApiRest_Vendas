import { getCustomRepository } from "typeorm"; // metodo para pegar um repositorio customizado
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "../../../shared/http/error/AppError";

interface IResquest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}


// classe que tem como responsabilidade Mostrar os dados de um produto
class UpdateProductService {
  public async execute({ id, name, price, quantity}: IResquest): Promise<Product>{

    const productsRepository = getCustomRepository(ProductRepository); // pegando o repositorio customizado


    // pegando um produto especifico(id) que tem em repository
    const product = await productsRepository.findOne(id);

    // validando se ele existe
    if(!product){
      throw new AppError('Product not found')
    }

    // verificando se o nome já existe
    const productExists = await productsRepository.findByName(name);

    // se nome já existe e esse nome for diferente do nome que vai ser alterado
    // pq o usuario pode apenas manter o nome e alterar apenas outros dados do produto
    if(productExists && name !== product.name){
      throw new AppError('There is already one product with this name')
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    // salvando atualização
    await productsRepository.save(product);

    // retornando o produto
    return product;
  }
}


export default UpdateProductService;
