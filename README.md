# BookInfoAPI

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Table of Contents

- [BookInfoAPI](#bookinfoapi)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Books](#books)
  - [Contributing](#contributing)
  - [License](#license)
    - [Author **Bolaji Bolajoko**](#author-bolaji-bolajoko)

## Introduction

BookInfoAPI is a RESTful API with 7k records of book records built with Node.js, Express.js, and MongoDB. The API provides access to a collection of book records, including details such as ISBN, title, author, categories, and more. It's designed to serve as a backend for applications that need to manage and display book information.

## Features

- Search books by various criteria such as title, author, or category.
- Paginated responses to handle large collections of book data.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running locally or accessible via a cloud service.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/BookInfoAPI.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BookInfoAPI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:

   - Create a `.env` file in the root directory and add the following:

     ```env
     PORT=3000

     ```

5. Start the server:
   ```bash
   npm start
   ```
6. The API will be available at `http://localhost:3000`.

## Usage

You can interact with the API using tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/). Below is an example of fetching all books:

```bash
curl -X GET http://localhost:3000/api/books
```

You can get all books categories

```bash
curl -X GET http://localhost:3000/api/categories
```

## API Endpoints

### Books

- Get All Books

  - GET /api/books
  - Fetch a list of all books.
  - Fetch query books by title, authors and category

- Get a Single Book

  - GET /api/books/:id
  - Fetch details of a single book by its ID.

- Response Body

  ```json
  {
    "isbn13": "9780002005883",
    "isbn10": "0002005883",
    "title": "Gilead",
    "subtitle": "",
    "authors": "Marilynne Robinson",
    "categories": "Fiction",
    "thumbnail": "http://books.google.com/books/content?id=KQZCPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "description": "A novel description here...",
    "published_year": "2004",
    "average_rating": "3.85",
    "num_pages": "247",
    "ratings_count": "361"
  }
  ```

- Get books categories
  - GET /api/categories
  - Fetch all books category
  
- Response Body
```json
{
  "success": true,
  "categories": [
    "Fiction",
    "Detective and mystery stories",
    "American fiction",
    "Christian life",
    "Authors, English",
    "Africa, East",
    "Hyland, Morn (Fictitious character)",
    "Adventure stories",
    "Arthurian romances",
    "Fantasy fiction",
    null,
    "English drama",
    "Country life",
    "English fiction",
    "Clergy",
    "Aubrey, Jack (Fictitious character)",
    "Detective and mystery stories, English",
    "Black Death",
    "Human cloning",
    "Science fiction"
  ]
}
```

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes and commit (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a Pull Request.
   
## License
This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/apl1-0-php) file for details.
   
### Author **Bolaji Bolajoko** 
