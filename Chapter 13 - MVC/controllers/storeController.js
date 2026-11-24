const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    })
  );
};

exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.fetchAll((registeredHomes) => {
    const home = registeredHomes.find((registeredHome) => registeredHome.id === homeId);

    if (!home) {
      return res.status(404).render("404", {
        pageTitle: "Home Not Found",
        currentPage: "404",
      });
    }

    return res.render("store/home-detail", {
      home,
      pageTitle: "Home Detail",
      currentPage: "Home",
    });
  });
};

exports.getHomeDetails = exports.getHomesDetails;
