# Blogs API

Esse projeto consiste de uma API RESTFULL 

## Como utilizar

- Clonar o projeto
- Rodar o comando `npm install`
- Rodar o comando `npm start` ou `npm run debug` para utilizar o `nodemon`

## Tecnologias e bibliotecas utilizadas

- Express
- Sequelize
- MySQL
- JWT
- ByCrypt
- Docker
- Nodemon

## Rotas

### POST/login

Essa rota permite fazer o login

Exemplo do corpo da requisição

```
{
  "email": "teste@gmail.com",
  "password": "12345"
}
```

A resposta recebida é um token

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdGVAZW1haWwuY29tIiwiaWF0IjoxNjU4MzIzNDQ1LCJleHAiOjE2NjA5MTU0NDV9.wNbb3Oi9GmKmbc8cLdqf2RJqKHaX1bA7B1Zc7WagmVg"
}
```

### POST/user 

Essa rota permite fazer o cadastro de um novo usuario

```
{
  "displayName": "Um Teste Qualquer",
  "email": "teste@email.com",
  "password": "123456",
  "image": "http://image.png"
}
```

A resposta recebida é um token

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdGVAZW1haWwuY29tIiwiaWF0IjoxNjU4MzIzNDQ1LCJleHAiOjE2NjA5MTU0NDV9.wNbb3Oi9GmKmbc8cLdqf2RJqKHaX1bA7B1Zc7WagmVg"
}
```

### GET/user

Essa rota permite listar todos os usuarios cadastrados

É necessário passar o `token` no header da requisição através da key `Authorization`

Exemplo de resposta recebida 

```
[
    {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    {
        "id": 2,
        "displayName": "Michael Schumacher",
        "email": "MichaelSchumacher@gmail.com",
        "image": "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
    },
    {
        "id": 3,
        "displayName": "Um Teste Qualquer",
        "email": "teste@email.com",
        "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }
]

```

### GET /user:id

Essa rota busca o usuário pelo `id`

Exemplo de requisição 

`http://localhost:3030/user/1`

É necessário passar o `token` no header da requisição através da key `Authorization`

Exemplo de resposta recebida 

```
{
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
}
``` 

### POST/categories

Essa rota permite criar uma nova categoria

É necessário passar o `token` no header da requisição através da key `Authorization`

Exemplo do corpo da requisição 

```
{
  "name": "JS"
}
```

Exemplo de resposta 

```
{
    "id": 3,
    "name": "JS"
}
```

### GET/categories

Essa rota permite listar todas as categorias

É necessário passar o `token` no header da requisição através da key `Authorization`

Exemplo de resposta 

```
[
    {
        "id": 1,
        "name": "Inovação"
    },
    {
        "id": 2,
        "name": "Escola"
    },
    {
        "id": 3,
        "name": "JS"
    }
]
```

### POST /post

Essa rota permite criar um novo post

É necessário passar o `token` no header da requisição através da key `Authorization`

Exemplo do corpo da requisição 

```
{
  "title": "Teste",
  "content": "Teste",
  "categoryIds": [1, 2]
}
```

Exemplo de resposta 

```
{
    "id": 4,
    "title": "Teste",
    "content": "Teste",
    "userId": 3
}
```

### GET/post

Essa rota permite listar todos os posts 

É necessário passar o `token` no header da requisição através da key `Authorization`

Exemplo de resposta 

```
[
    {
        "id": 1,
        "title": "Post do Ano",
        "content": "Melhor post do ano",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
            {
                "id": 1,
                "name": "Inovação",
                "PostCategory": {
                    "postId": 1,
                    "categoryId": 1
                }
            },
            {
                "id": 3,
                "name": "JS",
                "PostCategory": {
                    "postId": 3,
                    "categoryId": 1
                }
            }
        ]
    },
    {...}
]
```

### GET post/:id 

Essa rota permite buscar um post pelo seu `id`

Exemplo de requisição 

`http://localhost:3030/post/1`

É necessário passar o `token` no header da requisição através da key `Authorization`

Exemplo de resposta 

```
{
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
        {
            "id": 1,
            "name": "Inovação",
            "PostCategory": {
                "postId": 1,
                "categoryId": 1
            }
        },
        {
            "id": 3,
            "name": "JS",
            "PostCategory": {
                "postId": 3,
                "categoryId": 1
            }
        }
    ]
}
```

### PUT user/:id

Essa rota permite atualizar um post

Requisição 

Exemplo de url

`http://localhost:3030/post/2`

É necessário passar o `token` no header da requisição através da key `Authorization`

Exemplo do body 

```
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```

Exemplo de resposta 

```
{
    "id": 2,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2022-07-20T13:59:27.000Z",
    "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
        {
            "id": 2,
            "name": "Escola",
            "PostCategory": {
                "postId": 2,
                "categoryId": 2
            }
        },
        {
            "id": 3,
            "name": "JS",
            "PostCategory": {
                "postId": 3,
                "categoryId": 2
            }
        }
    ]
}
```

### DELETE post/:id 

Essa rota permite deletar um post 

Exemplo de requisição 

`http://localhost:3030/post/1`

É necessário passar o `token` no header da requisição através da key `Authorization`

A resposta é um `status 204` 


### GET post/search?q=

Essa rota permite pesquisar uma palavra presente no `title` ou `content`de um post

Exemplo de requisição 

`http://localhost:3030/post/search?q=a`

É necessário passar o `token` no header da requisição através da key `Authorization`

Exemplo de resposta

```
[
    {
        "id": 2,
        "title": "Latest updates, August 1st",
        "content": "The whole text for the blog post goes here in this key",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2022-07-20T13:59:27.000Z",
        "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
            {
                "id": 2,
                "name": "Escola",
                "PostCategory": {
                    "postId": 2,
                    "categoryId": 2
                }
            },
            {
                "id": 3,
                "name": "JS",
                "PostCategory": {
                    "postId": 3,
                    "categoryId": 2
                }
            }
        ]
    }
]
```