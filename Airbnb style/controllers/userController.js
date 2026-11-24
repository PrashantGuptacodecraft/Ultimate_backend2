import Home from '../models/Home.js';

export const getIndex = (req, res) => {
  res.render('home', {
    title: 'Airbnb Home',
    homes: Home.fetchAll(),
  });
};
