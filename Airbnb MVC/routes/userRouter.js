import express from 'express';
import Home from '../models/home.js';

const router = express.Router();
router.get('/', (req, res) => res.render('home', {
  registerHomes: Home.fetchAll(),
  pageTitle: 'Dirbnb stays',
  added: req.query.added === '1',
}));
export default router;
