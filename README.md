# Marketimobi UI

Este projeto é uma aplicação web desenvolvida em Angular para interagir com a API REST [marketimobi-api](https://github.com/williammian/marketimobi-api), focada na geração de peças de marketing imobiliário.

## Funcionalidades Principais

- **Interface Responsiva**: Utilização do PrimeNG para componentes UI modernos e responsivos.
- **Integração com API REST**: Consumo de endpoints da `marketimobi-api` para operações de criação e gerenciamento de peças de marketing.
- **Dockerização**: Configuração para execução em contêineres Docker, facilitando a implantação.

## Tecnologias Utilizadas

- **Angular**: Framework principal para desenvolvimento da aplicação.
- **TypeScript**: Linguagem utilizada para desenvolvimento.
- **HTML & CSS**: Estruturação e estilização das páginas.
- **PrimeNG**: Biblioteca de componentes UI para Angular.
- **Docker & Nginx**: Para conteinerização e servidor web.

## Estrutura do Projeto

- **src/**: Código-fonte principal da aplicação.
- **e2e/**: Testes end-to-end.
- **Dockerfile**: Script para criação da imagem Docker.
- **docker-compose.yml**: Configuração para orquestração de contêineres.
- **angular.json**: Configurações do Angular CLI.
- **package.json**: Gerenciamento de dependências e scripts.

## Pré-requisitos

- **Node.js**: Ambiente de execução necessário para o Angular.
- **Angular CLI**: Ferramenta de linha de comando para Angular.
- **Docker**: Para execução em contêineres (opcional).

## Como Executar o Projeto

1. **Instalar Dependências**:
   ```bash
   npm install
   ```

2. **Executar o Servidor de Desenvolvimento**:
   ```bash
   ng serve
   ```
   Acesse `http://localhost:4200/` no navegador.

## Docker

1. **Construir a Imagem Docker**:
   ```bash
   docker build -t marketimobi-ui .
   ```

2. **Executar o Contêiner**:
   ```bash
   docker run -p 80:80 marketimobi-ui
   ```
   A aplicação estará disponível em `http://localhost/`.

## Licença

Este projeto está licenciado sob a licença MIT.

