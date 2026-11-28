const mongoose = require('mongoose');
const favourite = require('./favourite');
const homeSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true  
  },
  price: {
    type: Number, 
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,

    required: true
  },
  photoUrl: {
    type: String
  },
  description: {
    type: String
  }
});


homeSchema.pre('findOneAndDelete',async  function(next) {
  const id = this.getQuery()._id;
  await favourite.deleteMany({ houseId: id });
  next();
});

module.exports = mongoose.model('Home', homeSchema);///new model home bnaya schema homeSchema use krke






// module.exports = class Home {
//   constructor(houseName, price, location, rating, photoUrl, description, _id) {
//     this.houseName = houseName;
//     this.price = price;
//     this.location = location;
//     this.rating = rating;
//     this.photoUrl = photoUrl;
//     this.description = description;
//     if (_id) {
//       this._id = _id;
//     }
//   }

//   save() {
//     const db = getDB();
//     if (this._id) { // update
//       const updateFields = {
//         houseName: this.houseName,
//         price: this.price,
//         location: this.location,
//         rating: this.rating,
//         photoUrl: this.photoUrl,
//         description: this.description
//       };

//       return db.collection('homes').updateOne({_id: new ObjectId(String(this._id))}, {$set: updateFields});
//     } else { // insert
//       return db.collection('homes').insertOne(this);
//     }
//   }

//   static find() {
//     const db = getDB();
//     return db.collection('homes').find().toArray();
//   }

//   static findById(homeId) {
//     const db = getDB();
//     return db.collection('homes')
//     .find({_id: new ObjectId(String(homeId))})
//     .next();
//   }

//   static deleteById(homeId) {
//     const db = getDB();
//     return db.collection('homes')
//     .deleteOne({_id: new ObjectId(String(homeId))});
//   }
// };
