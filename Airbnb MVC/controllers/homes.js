import Home from '../models/home.js';

const getAddHome = (req, res) => {
  res.render('addHome', { pageTitle: 'Add a home', error: null, form: {} });
};

const postAddHome = (req, res) => {
  const { homeName, homeLocation, homePrice, rating, photoURL } = req.body;
  const price = Number(homePrice);
  if (!homeName?.trim() || !homeLocation?.trim() || !Number.isFinite(price) || price <= 0) {
    return res.status(400).render('addHome', { pageTitle: 'Add a home', error: 'Enter a home name, location, and a price greater than zero.', form: req.body });
  }
  if (rating && (!Number.isFinite(Number(rating)) || Number(rating) < 0 || Number(rating) > 5)) {
    return res.status(400).render('addHome', { pageTitle: 'Add a home', error: 'Rating must be between 0 and 5.', form: req.body });
  }
  new Home({ houseName: homeName, location: homeLocation, price, rating, photoURL }).save();
  return res.redirect('/?added=1');
};

export { getAddHome, postAddHome };
