import express from 'express';
const hostRouter = express.Router();
import {
  getAddHome,
  postAddHome,
} from '../controllers/hostController.js';

hostRouter.get('/', (req, res) => {
  res.redirect('/host/add-home');
});

hostRouter.get('/add-home', getAddHome);
hostRouter.post('/add-home', postAddHome);

export default hostRouter;