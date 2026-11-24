const db = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description ?? null;
    this.id = id;
  }

  async save() {
    const values = [
      this.houseName,
      this.price,
      this.location,
      this.rating,
      this.photoUrl,
      this.description,
    ];

    if (this.id) {
      return db.execute(
        "UPDATE homes SET houseName = ?, price = ?, location = ?, rating = ?, photoUrl = ?, description = ? WHERE id = ?",
        [...values, this.id]
      );
    }

    return db.execute(
      "INSERT INTO homes (houseName, price, location, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)",
      values
    );
  }

  static async fetchAll() {
    const [homes] = await db.execute("SELECT * FROM homes");
    return homes;
  }

  static async findById(homeId) {
    const [homes] = await db.execute("SELECT * FROM homes WHERE id = ?", [
      homeId,
    ]);
    return homes[0] || null;
  }

  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
  }
};
