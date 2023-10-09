import { createConnection } from 'typeorm';

createConnection(); // procura em toda aplicação a estrutura o arquivo ormconfig.json para pegar os parametros
                    // para se conectar com o banco de dados que neste caso é o postgres
