<h1 align="center">
  Simios
</h1>

## :books: Sobre o projeto

Este projeto visa a criação de uma API REST em Node.js que detecta se uma sequência de DNA pertence a um humano ou a um símio.

### :arrow_right_hook: Feito Com

Abaixo segue as tecnologias utilizadas neste projeto:

- [ESLint](https://eslint.org/) - O ESLint é uma ferramenta de lint plugável para JavaScript;
  - [eslint-config-standard](https://github.com/standard/eslint-config-standard) - Este pacote fornece o .eslintrc do Standard como uma configuração compartilhada extensível;
  - [eslint-plugin-standard](https://github.com/standard/eslint-plugin-standard) - Plugin do ESLint com regras do Standard;
  - [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) - Plugin do ESLint com regras para ajudar na validação de imports;
  - [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node) - Plugin do ESLint com regras adicionais para Node.js;
  - [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise) - Plugin do ESLint com regras para aplicar as melhores práticas para promessas;
- [EditorConfig](https://editorconfig.org/) - O EditorConfig é um formatador de arquivos e coleções em forma de Plugin para Editores de código/texto com o objetivo de manter um padrão de código consistente entre diferentes editores, IDE's ou ambientes;
- [Node.js](https://github.com/nodejs/node) - Node.js é um ambiente de tempo de execução JavaScript. Ele executa o código JavaScript fora de um navegador;
    - [Express](https://github.com/expressjs/express) - Framework para Node.js que otimiza a construção de aplicações web e API's;
    - [Puppeteer](https://github.com/puppeteer/puppeteer) - Biblioteca para Node.js que fornece uma API de alto nível para controlar o Chrome ou Chromium através do protocolo DevTools;
- [TypeScript](https://github.com/microsoft/TypeScript) - TypeScript é um superconjunto de JavaScript desenvolvido pela Microsoft que adiciona tipagem e alguns outros recursos a linguagem;
    - [ts-node-dev](https://github.com/whitecolor/ts-node-dev) - Ferramenta que compila seus projetos com Typescript e reinicia o projeto quando o arquivo é modificado;
    - [tsconfig-paths](https://github.com/dividab/tsconfig-paths) - Ferramenta que permite mapear os módulos da aplicação e criar atalhos para essas pastas/arquivos de maneira escalável.

## :rocket: Começando

### :arrow_right_hook: Pré-requisitos

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

### :arrow_right_hook: Executar a aplicação

#### Local

A aplicação estará rodando na URL `http://localhost:3011`


#### Produção

### :arrow_right_hook: Testes

Para executar os testes:

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
Retorna as estatísticas de verificações de DNA, onde deve informar a quantidade de DNA’s símios, quantidade de DNA’s humanos, e a proporção de símios para a população humana.

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
