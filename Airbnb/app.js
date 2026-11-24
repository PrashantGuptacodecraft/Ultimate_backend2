import path from 'path';
import express from 'express';
import router from './routes/userRouter.js';
import hostRouter from './routes/hostRouter.js';
import pathUtil from './utils/pathUtil.js';

const app = express();
app.use(express.urlencoded({ extended: true }));// Parse URL-encoded bodies
app.use(router);
app.use("/host", hostRouter);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(pathUtil, 'views', '404.html'))  
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});