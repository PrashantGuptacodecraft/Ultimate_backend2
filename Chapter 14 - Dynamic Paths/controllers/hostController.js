const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = async (req, res, next) => {
  const editing = req.query.editing === 'true';

  try {
    const home = await Home.findById(req.params.homeId);
    if (!home) {
      return res.redirect("/host/host-home-list");
    }

    res.render("host/edit-home", {
      home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
    });
  } catch (error) {
    next(error);
  }
};

exports.getHostHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.fetchAll();
    res.render("host/host-home-list", {
      registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    });
  } catch (error) {
    next(error);
  }
};

exports.postAddHome = async (req, res, next) => {
  try {
    const { houseName, price, location, rating, photoUrl, description } = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl, description);
    await home.save();
    res.redirect("/host/host-home-list");
  } catch (error) {
    next(error);
  }
};

exports.postEditHome = async (req, res, next) => {
  try {
    const { id, houseName, price, location, rating, photoUrl, description } = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl, description, id);
    await home.save();
    res.redirect("/host/host-home-list");
  } catch (error) {
    next(error);
  }
};

exports.postDeleteHome = async (req, res, next) => {
  try {
    await Home.deleteById(req.params.homeId);
    res.redirect("/host/host-home-list");
  } catch (error) {
    next(error);
  }
};