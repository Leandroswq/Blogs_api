const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const YAML = require('yamljs');
const errorMiddleware = require('./middlewares/error');

const swaggerDocument = YAML.load('swagger.yml');

// ...

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
// ...
const loginRouter = require('./routers/login');
const userRouter = require('./routers/user');
const categorieRouter = require('./routers/category');
const postRouter = require('./routers/post');

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categorieRouter);
app.use('/post', postRouter);

app.use(errorMiddleware);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
