
import express from 'express';
import { getAddHome, postAddHome } from '../controllers/homes.js';

const hostRouter = express.Router();

hostRouter.get('/', (req, res) => {
  res.redirect('/host/add-home');
});

hostRouter.get('/add-home', getAddHome);

hostRouter.post('/add-home', postAddHome);

export { hostRouter };
