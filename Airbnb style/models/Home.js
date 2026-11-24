const registeredHomes = [];

export default class Home {
  constructor({ houseName, location, price }) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
  }

  save() {
    registeredHomes.push(this);
  }

  static fetchAll() {
    return [...registeredHomes];
  }
}
