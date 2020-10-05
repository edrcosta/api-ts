## This project still in development

### Requirements 

- [node](https://nodejs.org/en/download/)
- [mysql](https://www.mysql.com/)
- [typescritp](https://www.typescriptlang.org/)

### Docs 

On documentation folder you find a [postman](https://www.postman.com/) collection... also a [mysql worckbench](https://www.mysql.com/products/workbench/) model describing the database.

### install and running 

1. clone this project.
2. go into the root folder.
3. type `npm install`
4. setup the database with the worckbench model (@todo sequelize migrations)
5. npm start

### Availiable endpoints 

- POST: /authentication
- GET:  /auction/:id
- PUT:  /auction/:id/end
- PUT:  /auction/:id/start
- POST: /auction/:auctionId/bid
- POST: /auction