const { getDb } = require("../utils/databaseUtil");

module.exports = class Booking {
  static add(homeId) {
    return getDb().collection("bookings").insertOne({
      homeId,
      createdAt: new Date(),
    });
  }

  static fetchAll() {
    return getDb()
      .collection("bookings")
      .aggregate([
        {
          $lookup: {
            from: "homes",
            localField: "homeId",
            foreignField: "_id",
            as: "home",
          },
        },
        {
          $unwind: {
            path: "$home",
            preserveNullAndEmptyArrays: true,
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();
  }
};
