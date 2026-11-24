import path from 'path';
import express from 'express';
import userRouter from './routes/userRouter.js';
import hostRouter from './routes/hostRouter.js';
import pathUtil from './utils/pathUtil.js';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(pathUtil, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(pathUtil, 'public')));
app.use(userRouter);
app.use('/host', hostRouter);
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});