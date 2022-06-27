<h2 align="center">
  Infnet - Projeto de Bloco: Engenharia Disciplinada de Softwares.
  Aluno: Bruno Feijó Rocha
  Professor: Armênio Torres Cardoso
  Projeto: Ventura-Hr
</h2>

## API Restful com Node.js, Express, Typescript, Sequealize, Mysql, ...

### Estrutura do Projeto

Estrutura de pastas:

`modules` - abrangem as áreas de conhecimento da aplicação, diretamente relacionados com as regras de negócios. A princípio criaremos os seguintes módulos na aplicação: candidates, jobs, recruitments, skills e users.

`shared` - módulos de uso geral compartilhados com mais de um módulo da aplicação, como por exemplo, o arquivo server.ts, o arquivo principal de rotas, conexão com banco de dados, etc.

`public` - abrangem as áreas das imagens dos usuários do sistema.

- A senha é armazenada com criptografia;
- Não pode haver um mesmo email sendo usado por mais de um usuário;
