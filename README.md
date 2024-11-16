# Desafio - Frontend - Teddy Open Finance

Este projeto implementa um sistema de cadastro de usuários/parceiros integrados em nossas aplicações. Ele foi desenvolvido seguindo o conceito de micro front-ends, dividindo as funcionalidades em dois projetos separados: um em Angular 15 e outro em React.js.  Essa arquitetura permite que diferentes times trabalhem de forma independente em cada parte do sistema.

## Descrição do Sistema

O sistema permite cadastrar usuários com suas informações, onde são utilizados e quais clientes são atendidos.  Ele se integra com duas APIs externas para persistir os dados.

## Tecnologias Utilizadas

* **Single-SPA:** Para gerenciar as diferentes aplicações em um único contexto.
* **React.js:** Utilizado para o módulo de cadastro e listagem de empresas externas.
* **Typescript:** Para desenvolver as aplicações em TypeScript.
* **HTML5 & CSS3:**  Utilizados para a landing page inicial.
* **Docker:**  O projeto está preparado para ser executado em contêineres, facilitando o deploy em ambientes cloud como AWS ECS.

## APIs

O sistema consome as seguintes APIs:

* Usuários: `https://boasorte.teddybackoffice.com.br/users`


Ambas as APIs possuem os seguintes endpoints:

* `GET /`: Listar todos
* `GET /:id`: Listar um por ID
* `POST /`: Cadastrar
* `PUT /:id`: Atualizar
* `DELETE /:id`: Deletar

## Funcionalidades

* **Login:**  Com opção de digitar usuário e senha. O login redireciona para a página inicial. Possui funcionalidade "Manter conectado" que salva o usuário em cookie (se marcado) ou local storage (se não marcado).
* **Cadastro de Usuário:** Permite cadastrar novos usuários.
* **Listagem de Usuários:** Exibe os usuários cadastrados em uma tabela com paginação e ações para editar/deletar.
* **Sobre a Aplicação:**  Página com informações sobre o projeto.
* **Sair:**  Redireciona para a página de login.

## Rodando o Projeto

#### Antes de tudo, para poder rodar o projeto, é necessário ter o Docker instalado em sua máquina.
#### Para instalar o Docker, acesse o site oficial do Docker e siga as instruções.

### Após instalar o Docker, execute os seguintes comandos no terminal:
(Você terá que entrar na pasta de cada projeto para executar os comandos)

```bash
  $ cd intro && yarn
```
```bash
  $ cd nav_bar && yarn
```
```bash
  $ cd raw_clients && yarn
```
```bash
  $ cd selected_clients && yarn
```
```bash
  $ cd root && yarn
```

Após instalar as dependências, execute o comando abaixo (em cada pasta/projeto) para iniciar o projeto:

```bash
  $ cd intro && yarn start
```
```bash
  $ cd nav_bar && yarn start
```
```bash
  $ cd raw_clients && yarn start
```
```bash
  $ cd selected_clients && yarn start
```
```bash
  $ cd root && yarn start
```


### Para acessar a aplicação, basta abrir o navegador e digitar o endereço `[localhost:9000](http://localhost:9000/)
```bash
  http://localhost:9000/
```

## Deploy

* **Vercel:** [URL do deploy no Vercel](https://dasafio-frontend-teddy.vercel.app/)

## Vídeo

[\[Veja Vídeo explicativo do Projeto\]](https://youtu.be/mR1pqeSXkvc)

## Síntese e destaques do projeto

Ao longo do desenvolvimento, todas as funcionalidades planejadas foram entregues, cumprindo integralmente as exigências técnicas e os requisitos de tecnologia. A arquitetura modular do single-spa foi uma escolha que favoreceu a flexibilidade e escalabilidade, apesar de gerar alguma repetição de componentes e padronizações necessárias. Priorizei soluções rápidas e eficazes para cada cenário enfrentado, mantendo o foco na qualidade e atendendo às especificações do desafio, bem como aos requisitos adicionais (bônus).

O ambiente de microfrontends apresentou desafios, principalmente relacionados à containerização e ao reaproveitamento de componentes dinâmicos, que foram tratados com atenção para garantir a integridade do sistema. Embora restrições de CORS tenham limitado o consumo direto da API proposta, todas as funcionalidades foram implementadas de acordo com os DTOs e payloads definidos na documentação fornecida.
