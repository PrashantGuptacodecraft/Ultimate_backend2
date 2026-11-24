const Favourite = require("../models/favourite");
const Home = require("../models/home");

const getFavourites = () =>
  new Promise((resolve) => {
    Favourite.getFavourites((favourites) => resolve(favourites));
  });

const updateFavourite = (update) =>
  new Promise((resolve, reject) => {
    update((error) => (error ? reject(error) : resolve()));
  });

exports.getIndex = async (req, res, next) => {
  try {
    const registeredHomes = await Home.fetchAll();
    res.render("store/index", {
      registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  } catch (error) {
    next(error);
  }
};

exports.getHomes = async (req, res, next) => {
  try {
    const registeredHomes = await Home.fetchAll();
    res.render("store/home-list", {
      registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const [favourites, registeredHomes] = await Promise.all([
      getFavourites(),
      Home.fetchAll(),
    ]);
    const favouriteIds = new Set(favourites.map(String));
    const favouriteHomes = registeredHomes.filter((home) =>
      favouriteIds.has(String(home.id))
    );

    res.render("store/favourite-list", {
      favouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    });
  } catch (error) {
    next(error);
  }
};

exports.postAddToFavourite = async (req, res, next) => {
  try {
    const homeId = req.body.id;
    if (!homeId) {
      return res.status(400).send("A home ID is required.");
    }

    await updateFavourite((callback) =>
      Favourite.addToFavourite(homeId, callback)
    );
    res.redirect("/favourites");
  } catch (error) {
    if (error === "Home is already marked favourite") {
      return res.redirect("/favourites");
    }
    next(error);
  }
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  try {
    await updateFavourite((callback) =>
      Favourite.deleteById(req.params.homeId, callback)
    );
    res.redirect("/favourites");
  } catch (error) {
    next(error);
  }
};

exports.getHomeDetails = async (req, res, next) => {
  try {
    const home = await Home.findById(req.params.homeId);
    if (!home) {
      return res.redirect("/homes");
    }

    res.render("store/home-detail", {
      home,
      pageTitle: "Home Detail",
      currentPage: "Home",
    });
  } catch (error) {
    next(error);
  }
};
