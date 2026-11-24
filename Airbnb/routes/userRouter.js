import path from 'path';
import pathUtil from '../utils/pathUtil.js';
import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(pathUtil, 'views', 'home.html'));
});

export default router;