<h1 align="center">
  Simios
</h1>

## :books: Sobre o projeto

Este projeto visa a criação de uma API REST em Node.js que detecta se uma sequência de DNA pertence a um humano ou a um símio.

### :arrow_right_hook: Feito Com

O projeto foi desenvolvido como serverless utilizando AWS Lambda, API Gateway, RDS (Postgres) e RDS Proxy.

Abaixo segue as tecnologias utilizadas neste projeto:

- AWS Lambda - Plataforma de computação sem servidor e orientada a eventos
- API Gateway - Serviço para criação, publicação, manutenção, monitoramento e proteção de APIs REST;
- RDS - Serviço de banco de dados relacional distribuído;
- RDS Proxy - Proxy de banco de dados totalmente gerenciado que torna os aplicativos mais escaláveis, mais resilientes a falhas de banco de dados e mais seguros;
- [chai](https://github.com/chaijs/chai) - Chai é uma biblioteca de asserção, semelhante à embutida do Node assert;
- [cross-env](https://github.com/kentcdodds/cross-env) - Cross-env é uma biblioteca para executar scripts que definem e usam variáveis ​​de ambiente em plataformas;
- [dotenv](https://github.com/motdotla/dotenv) - Dotenv é um módulo de dependência zero que carrega variáveis ​​de ambiente de um .env arquivo para o process.env;
- [lambda-tester](https://github.com/vandium-io/lambda-tester) - Lambda-tester é uma biblioteca para escrever testes de unidade para AWS Lambda funções usando Node.js;
- [mocha](https://github.com/mochajs/mocha) - Mocha é uma biblioteca de teste para Node.js, criado para ser simples, extensível e rápido;
- [Node.js](https://github.com/nodejs/node) - Node.js é um ambiente de tempo de execução JavaScript. Ele executa o código JavaScript fora de um navegador;
- [nodemon](https://github.com/remy/nodemon) - Nodemon é uma ferramenta que ajuda a desenvolver aplicativos baseados em node.js reiniciando automaticamente o aplicativo quando mudanças são detectadas;
- [pg](https://github.com/brianc/node-postgres/tree/master/packages/pg) - Pg é um cliente PostgreSQL sem bloqueio para Node.js;
- [sequelize](https://github.com/sequelize/sequelize) - Sequelize é um ORM para Node.js baseado em promessa;
- [serverless](https://github.com/serverless/serverless) - Serverless é um framework para construir aplicativos compostos de microsserviços que são executados em resposta a eventos;
    - [serverless-offline](https://github.com/dherault/serverless-offline) - Plugin para emular AWS λ e API Gateway em sua máquina local;
    - [serverless-plugin-typescript](https://github.com/prisma-labs/serverless-plugin-typescript) - Plug-in para suporte a Typecript;
- [sinon](https://github.com/sinonjs/sinon) - Sinon é uma biblioteca JavaScript para testes spies, stubs and mocks;
- [tslint](https://github.com/palantir/tslint) - TSLint é uma ferramenta de análise estática extensível que verifica o código TypeScript para erros de legibilidade, manutenção e funcionalidade;
  - [tslint-config-airbnb](https://github.com/progre/tslint-config-airbnb) - Uma configuração TSLint para o Guia de estilo do Airbnb JavaScript;
- [TypeScript](https://github.com/microsoft/TypeScript) - TypeScript é um superconjunto de JavaScript desenvolvido pela Microsoft que adiciona tipagem e alguns outros recursos a linguagem;
    - [ts-node-dev](https://github.com/whitecolor/ts-node-dev) - Ferramenta que compila seus projetos com Typescript e reinicia o projeto quando o arquivo é modificado.

## :rocket: Começando

### :arrow_right_hook: Pré-requisitos

- Node > v10.13.0
- Npm > v6.4.1
- Docker

### :arrow_right_hook: Estrutura de arquivos

A estrutura de arquivos está da seguinte maneira:

```bash
simios
├── app/
│   ├── config/
│   │    ├── sequelize/
│   │    │   └── ConfigSequelize.ts
│   ├── controller/
│   │   └── DNAController.ts
│   ├── model/
│   │   └── DNAModel.ts
│   ├── service/
│   │   └── DNAService.ts
│   ├── utils/
│   │   └── Util.ts
│   └── handler.ts
├── assets/
│   └── coverage.png
├── config/
│   ├── database/
│   │    ├── migrations/
│   │    │   └── init.ts
|   │    ├── .editorconfig
├── environments/
│   └── DNAController.ts
├── tests/
│   └── dna.mock.ts
│   └── dna.test.ts
├── .editorconfig
├── .gitignore
├── .nycrc.json
├── .sequelizerc
├── docker-compose.yml
├── Dockerfile
├── package.json
├── README.md
├── tsconfig.json
└── tslint.json
```

### :arrow_right_hook: Instalação

    $ git clone https://github.com/gguibittencourt/simios
    $ cd simios
    $ docker-compose up -d

### :arrow_right_hook: Aplicação

#### Local

A aplicação estará rodando na URL `http://localhost:3011`

Ao executar o comando `docker-compose up -d`, para subir a aplicação o Docker executa o comando:

    $ npm run local

#### Produção

A aplicação estará rodando na URL `https://39dvnchwsa.execute-api.us-east-1.amazonaws.com/dev`

Para fazer deploy da aplicação é necessário acessar o container `simios_simios_1` do docker e rodar o comando:
    
    $ npm run deploy
    
Utiliza os serviços da AWS:
- Lambda
- API Gateway
- RDS
- RDS Proxy


### :arrow_right_hook: Testes

Para executar os testes é necessário acessar o container `simios_simios_1` do docker e rodar o comando:

    $ npm run coverage
    
- Após executar será criada uma pasta `coverage` com os resultados dos testes, para verificar o percentual de cobertura basta acessar `coverage/lcov-report/app` e abrir o arquivo `index.html`
 
 ![alt text](https://github.com/gguibittencourt/simios/blob/master/assets/coverage.png?raw=true)
 
### :arrow_right_hook: API

#### Simian
Verifica se a sequência de DNA pertence a um humano ou a um símio e insere no banco de dados as informações.

- Caso o DNA seja identificado como um símio, o retorno será um HTTP 200-OK, caso contrário um HTTP 403-FORBIDDEN.

**Requisição:**
```json
POST /simian

{
	"dna": ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"]
}
```

#### Stats
Retorna as estatísticas de verificações de DNA, onde informa a quantidade de DNA’s símios, quantidade de DNA’s humanos, e a proporção de símios para a população humana.

**Requisição:**
```json
GET /stats
```
**Resposta:**
```json
{
	"count_mutant_dna": 40, 
   	"count_human_dna": 100,
	"ratio": 0.4
}
```
