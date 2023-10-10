import {EntityRepository, Repository} from "typeorm";
import Product from '../entities/Product'; // pegando a entidade Product

// Classe chamada ProductRepository que vai usar a entidade Product
// lembre-se uma "entidade" no typeOrm é uma classe que representa uma tabela no banco de dados relacional
// tipado por Product.
// que reebe por parametro um name(string)
// ele sempre vai retornar ou um Product(a query) ou undefined

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    // product vai receber o Primeiro registro name de acordo com o name(parametro) passado é um query
    const product = this.findOne({
        where: {
          name,

        },
    });

    return product; // retornando o product que vai fazer a query do registro que neste caso busca se existe o
                    //registro passado pelo parametro
  }
}
