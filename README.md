
# Stratex Backend Assigment

It's my backend Assignment. In this assignment, I  demonstrated my proficiency in server-side programming, database management, API development, and application architecture.


## Tech Stack

Created It using Typescript, ExpressJs, jsonwebToken (JWT), Bcrypt, multer,Prisma (as ORM) and I have used Vercel's free postgreSQL DB and connect to it with the help of Prisma. 
## Installation
- Clone the repository.
- setup an .env file with all these fields 
POSTGRES_URL: \
POSTGRES_PRISMA_URL :\
POSTGRES_URL_NO_SSL :\
POSTGRES_URL_NON_POOLING :\
POSTGRES_USER :\
POSTGRES_HOST :\
POSTGRES_PASSWORD :\
POSTGRES_DATABASE :\
JWT_SECRET :\
PORT :
- In the root director run this following commands 
``` 
npm install 
npx prisma generate 
npx prisma db push
```

- run commands (run these commad in the root directory)
```
nodemon ./src/server.ts
OR
ts-node ./src/server.ts
```

# Routes

### # Authentication Routes



#### POST : /auth/register - To create a user
```
# SELLER
{
  "name": "john doe",
  "email": "johnDoe@gmail.com",
  "password": "password123",
  "role": "SELLER"   // role can be "SELLER" OR "USER"
}
#USER
{
  "name": "jane smit",
  "email": "jane@gmail.com",
  "password": "password123",
  "role": "USER"   // role can be "SELLER" OR "USER"
}
```
#### POST : /auth/register - To sign-in a user
After signing in you will get a token which you will have to send in all the Book routes headers to get authenticated. Some routes are accessed by both "SELLER" and "USER" but some routes are only accessible by "SELLER". So send this bearer token in all the BOOK request.
```
{
    "email" : "jane@gmail.com",
    "password" : "password123"
}
```

### # Books Routes
send the bearer token in header to access all these routes.
#### GET : /api/books/:id - To get a specific book
Acessible to : ["SELLER" , "USER"]

response 
```
{
    "id": 7,
    "title": "Moby-Dick",
    "author": "Herman Melville",
    "publishedDate": "1851-10-18T00:00:00.000Z",
    "price": 11.5,
    "userId": 2
}
```

#### POST : /api/books - To create a book with JSON
Acessible to : ["SELLER"]

sample data 
```
{
  "title": "1984",
  "author": "George Orwell",
  "price": 8.99,
  "publishedDate": "1949-06-08"
}

```
#### PUT : /api/books/:id - To update a specific book
Acessible to : ["SELLER"]

sample data
```
{
  "title": "The Great Gatsby - Updated",
  "author": "F. Scott Fitzgerald",
  "price": 12.99,
  "publishedDate" :"1949-06-08"
}
```

#### DELETE : /api/books/:id - To delete a specific book

Acessible to : ["SELLER"]

response 
```
{msg : "Book deleted Successfully!"}
```
#### POST : /api/books/upload - To create books with the help of a csv file
Acessible to : ["SELLER"]

sample csv file url
```
https://docs.google.com/spreadsheets/d/16dSwNe8u4Aj4wCRka3bYtIWhFyjDlVZuXPRgmPQKpE0/edit
```
#### GET : /api/books - To Get all the available books.
Acessible to : ["SELLER" , "USER"]

sample response
```
[
    {
        "id": 2,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "publishedDate": "1925-04-10T00:00:00.000Z",
        "price": 10.99,
        "userId": 2
    },
    {
        "id": 3,
        "title": "1984",
        "author": "George Orwell",
        "publishedDate": "1949-06-08T00:00:00.000Z",
        "price": 8.99,
        "userId": 2
    },
]
```
