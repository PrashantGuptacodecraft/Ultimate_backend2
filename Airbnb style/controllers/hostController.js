import Home from '../models/Home.js';

export const getAddHome = (req, res) => {
  res.render('addHome', {
    title: 'Add Home',
    error: null,
  });
};

export const postAddHome = (req, res) => {
  const homeName = req.body.homeName?.trim();
  const homeLocation = req.body.homeLocation?.trim();
  const price = Number(req.body.homePrice);

  if (!homeName || !homeLocation || !Number.isFinite(price) || price <= 0) {
    return res.status(400).render('addHome', {
      title: 'Add Home',
      error: 'Enter a name, location, and a price greater than zero.',
    });
  }

  new Home({ houseName: homeName, location: homeLocation, price }).save();
  return res.render('homeAdded', { title: 'Home Added Successfully' });
};
