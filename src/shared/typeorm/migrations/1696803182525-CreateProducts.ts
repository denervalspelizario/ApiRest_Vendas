import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1696803182525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      await queryRunner.createTable(
        new Table({ // criando uma tabela
          name: 'products', //nome products
          columns: [
            {
              name: 'id', // coluna
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name', // coluna
              type: 'varchar'
            },
            {
              name: 'price', // coluna
              type: 'decimal',
              precision: 10,
              scale: 2,
            },
            {
              name: 'quantity', // coluna
              type: 'int'
            },
            {
              name: 'created_at', // coluna
              type: 'timestamp with time zone',
              default: 'now()',
            },
            {
              name: 'updated_at', // coluna
              type: 'timestamp with time zone',
              default: 'now()',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('products');
    }

}
