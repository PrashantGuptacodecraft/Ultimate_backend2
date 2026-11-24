const errorController = (req, res) => {
  res.status(404).render('404', { pageTitle: 'Page not found' });
};
export default { errorController };
