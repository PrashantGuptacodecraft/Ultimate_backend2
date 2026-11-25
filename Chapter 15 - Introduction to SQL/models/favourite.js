const { getDb } = require("../utils/databaseUtil");

module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = String(houseId);
  }

  save() {

    const db = getDb();
    return  db.collection("favourites").findOne({ houseId: this.houseId }).then((existingFavourite) => {
      if (!existingFavourite) {
        return db.collection("favourites").insertOne({ houseId: this.houseId });
      } else {
        console.log(`House with ID ${this.houseId} is already in favourites.`);
        return Promise.resolve(existingFavourite);
      }
    });
    // return getDb().collection("favourites").updateOne(
    //   { houseId: this.houseId },
    //   { $setOnInsert: { houseId: this.houseId } },
    //   { upsert: true }
    // );
  }

  static fetchAll() {
    return getDb().collection("favourites").find().toArray();
  }

  static deleteById(homeId) {
    return getDb()
      .collection("favourites")
      .deleteMany({ houseId: String(homeId) });
  }
};
