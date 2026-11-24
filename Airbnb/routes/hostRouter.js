import express from 'express';
import path from 'path';
import pathUtil from '../utils/pathUtil.js';

const hostRouter = express.Router();

hostRouter.get('/add-home', (req, res) => {
  res.sendFile(path.join(pathUtil, 'views', 'addHome.html'));
});

hostRouter.post('/add-home', (req, res) => {
  res.sendFile(path.join(pathUtil, 'views', 'homeAdded.html'));
});

export default hostRouter;