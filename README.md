# Projeto Blogs API

Esse projeto tem como objetivo testar meus conhecimentos em node.js, express, sequelize, REST e RESTFull.

Para isso foi desenvolvido uma api e um banco de dados para produção de conteúdo de um blog. Nela foi necessário criar um CRUD de posts, CRUD de usuários e os Create e Read das categorias de um post.

Também foi criado uma criado uma documentação no formato openapi 3.0.0 utilizando o swagger.

# Como usar Docker/local

### 1 - Clone o projeto

~~~
git clone git@github.com:Leandroswq/Blogs_api.git
~~~
* Entre na pasta do repositório que você acabou de clonar:
~~~
cd Blogs_api
~~~
<br>

### 2 - Instale as dependências

~~~
npm install
~~~
<br>

## Local
### 3 - Crie um arquivo .env na raiz do projeto e copie as variáveis de ambiente do arquivo .env.example para ele

Lembre-se de atualizar as variáveis de ambiente de acordo com acordo com a sua maquina

<br>

### 4 - No arquivo .env atualize os valores das variáveis de ambiente de acordo com as suas necessidades
<br>

### 5- Inicie a aplicação

~~~
npm start
~~~
<br>

## Docker  

<details>

<summary>Opção 1</summary>

### 3 - Inicialize o compose

~~~
npm run compose
~~~

<br>

### 4 - Inicialize a aplicação dentro do container

~~~
npm run container:start
~~~

Se der o erro `ERROR: connect ECONNREFUSED 123.123.123.1:3306`
significa que não deu tempo do banco de dados iniciar. Para resolver isso basta esperar alguns segundos e rodar o comando novamente.
</details>

<details>

<summary>Opção 2</summary>

### 3 Inicialize o compose junto com a aplicação

~~~
npm run compose:start
~~~

</details>

<br>

# Como acessar a documentação

### 1 - Inicie aplicação
<br>

### 2 - Acesse o endpoint host/api-docs
Exemplo
~~~
http://localhost:3000/api-docs
~~~