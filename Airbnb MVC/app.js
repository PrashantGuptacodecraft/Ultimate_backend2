import path from 'path';
import express from 'express';
import router from './routes/userRouter.js';
import { hostRouter } from './routes/hostRouter.js';
import pathUtil from './utils/pathUtil.js';
import err from './controllers/error.js';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(pathUtil, 'views'));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(pathUtil, 'public')));
app.use(router);
app.use('/host', hostRouter);
app.use(err.errorController);

const port = Number(process.env.PORT) || 3005;
app.listen(port, () => console.log(`Dirbnb is running on port ${port}`));
