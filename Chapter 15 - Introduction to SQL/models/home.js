// Core Modules
const { getDb } = require("../utils/databaseUtil");
const { ObjectId } = require("mongodb");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this.id = _id;
    }
  }

  save() {
    const db=getDb()
    if(this._db){//update existing home
      const updatefields = {
        houseName: this.houseName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description,
      }
return db.collection('homes').updateOne({_id: new ObjectId(String(this.id)  )}, {$set: updatefields})
    }
    else{
      return db.collection('homes').insertOne(this)
    }
   
  }

  static fetchAll() {
    const db=getDb()
    return db.collection('homes').find().toArray()
   
  }

  static findById(homeId) {
    const db=getDb()
    return db.collection('homes').find({ _id: new ObjectId(String(homeId)) }).next()
    
  }

  static deleteById(homeId) {
    const db=getDb()
    return db.collection('homes').deleteOne({ _id: new ObjectId(String(homeId)) })
  }
};

  

