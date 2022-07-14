const express = require('express');
require('express-async-errors');
const errorMiddleware = require('./middlewares/error');
// ...

const app = express();

app.use(express.json());

// ...
const loginRouter = require('./routers/login');
const userRouter = require('./routers/user');
const categorieRouter = require('./routers/category');

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categorieRouter);

app.use(errorMiddleware);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
