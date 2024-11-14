# Teste de Front-End - Teddy Open Finance
## Tecnologias
- [Single-SPA](https://single-spa.js.org/docs/getting-started-overview/)
- [TypeScript](https://www.typescriptlang.org/)
## Requisitos
- [Node.JS](https://nodejs.org/en/download)
- [Git](https://git-scm.com/downloads)
## Iniciando a aplicação
### Faça o clone do repositório e acesse o diretório

```bash
  $ git clone https://github.com/Nitael-dev/teddy_teste_front_end.git
  $ cd teddy_test_front_end
  $ cd teddy_teste_front_end
```

### Instale as dependências dos modulos da aplicação em diferentes terminais (Ctrl + T, Ctrl + Shift + T ou Command + T)
```bash
  $ cd root && yarn && yarn start
```
```bash
  $ cd welcome && yarn && yarn start
```
```bash
  $ cd nav && yarn && yarn start
```
```bash
  $ cd clients && yarn && yarn start
```
```bash
  $ cd selected_clients && yarn && yarn start
```
### Acesse a aplicação em qualquer Browser
```bash
  http://localhost:9000/
```
### Considerações de finalização e pontos-chave do projeto a ser apresentado
O projeto foi desenvolvido com todas as funcionalidades propostas, adotei soluções variadas que atenderam às exigências de uso das tecnologias requeridas. Devido a arquitetura modular do single-spa, houve uma certa repetição de componentes e padronizações realizadas. Mantive o foco sempre em criar soluções rápidas e eficazes para os diversos cenários enfrentados durante o desenvolvimento da aplicação, mantendo a excelência e qualidade do código entregue. O compromisso com as especificações do desafio e os Bônus foram a prioridade ao longo de todo o processo, onde encontrei peculiariadades do ambiente dos microfrontends, containerizações e reaproveitamento de componentes dinâmicos. Também gostaria de relatar um impedimento no consumo de API proposta por restrições de CORS, porém, todas as funcionalidades realizadas fielmente aos DTO's e Payloads encontrados na documentação fornecida.
