COMO RODAR O PROJETO BAIXADO
Instalar todas as dependencias indicada pelo package.json
### npm install

Alterar as credenciais do banco de dados e as credenciais do servidor de e-mail no arquivo ".env".

Rodar o projeto usando o nodemon 
### nodemon app.js

SEQUENCIA PARA CRIAR O PROJETO
Criar o arquivo package
### npm init

Gerencia as requisições, rotas e URLs, entre outra funcionalidades
### npm install express

Rodar o projeto 
### node app.js

Acessar o projeto no navegador
### http://localhost:8080

Instalar o módulo para reiniciar o servidor sempre que houver alteração no código fonte, g significa globalmente
### npm install -g nodemon

Instalar o banco de dados MySQL

Verificar o banco de dados MySQL no pront de comando
### mysql -h localhost -u root -p

Sequelize é uma biblioteca Javascript que facilita o gerenciamento de um banco de dados SQL
### npm install --save sequelize

Instalar o drive do banco de dados
### npm install --save mysql2
As views utilizadas no projeto estão na pasta `src\shared\database`

Instalar o módulo para criptografar a senha
### npm install --save bcryptjs

Instalar a dependencia para JWT
### npm install --save jsonwebtoken

Gerenciar variáveis de ambiente
### npm install --save dotenv

Permitir acesso a API
### npm install --save cors

Validar campo
### npm install --save yup

Módulo para enviar e-mail
### npm install --save nodemailer

Multer é um middleware node.js para manipulação multipart/form-data, usado para o upload de arquivos. 
### npm install --save multer