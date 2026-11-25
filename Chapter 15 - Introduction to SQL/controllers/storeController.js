const Favourite = require("../models/favourite");
const Booking = require("../models/booking");
const Home = require("../models/home");
const { ObjectId } = require("mongodb");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  });
};

exports.getBookings = (req, res, next) => {
  Booking.fetchAll()
    .then((bookings) => {
      res.render("store/bookings", {
        bookings,
        pageTitle: "My Bookings",
        currentPage: "bookings",
      });
    })
    .catch(next);
};

exports.postAddBooking = (req, res, next) => {
  const { homeId } = req.body;
  if (!ObjectId.isValid(homeId)) {
    return res.status(400).send("Invalid home ID.");
  }

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        return res.status(404).send("Home not found.");
      }
      return Booking.add(home._id).then(() => res.redirect("/bookings"));
    })
    .catch(next);
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.fetchAll()
    .then((favourites) => {
      const favouriteIds = new Set(favourites.map((favourite) => favourite.houseId));
      return Home.fetchAll().then((registeredHomes) => {
        const favouriteHomes = registeredHomes.filter((home) =>
          favouriteIds.has(String(home._id))
        );
        res.render("store/favourite-list", {
          favouriteHomes,
          pageTitle: "My Favourites",
          currentPage: "favourites",
        });
      });
    })
    .catch(next);
};

exports.postAddToFavourite = (req, res, next) => {
  new Favourite(req.body.id)
    .save()
    .then(() => res.redirect("/favourites"))
    .catch(next);
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
    .then(result => {
      console.log('Removed from favourites: ', result);
      
    }).catch
(error => {
      console.log('Error while removing from favourites: ', error);
    }).finally(() => {
      res.redirect("/favourites");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((homes) => {
    const home = homes[0];
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  })
};

