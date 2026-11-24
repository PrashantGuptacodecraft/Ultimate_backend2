
import path from 'path';
import fs from 'fs';
import rootDir from '../utils/pathUtil.js';

const dataDir = path.join(rootDir, 'Data');
const homeDataPath = path.join(dataDir, 'home.json');

fs.mkdirSync(dataDir, { recursive: true });

const homeDataExists = fs.existsSync(homeDataPath);
if (!homeDataExists) {
  fs.writeFileSync(homeDataPath, '[]');
}

const homeData = fs.readFileSync(homeDataPath, 'utf8');
const registeredHomes = homeData.trim() ? JSON.parse(homeData) : [];
if (!Array.isArray(registeredHomes)) {
  throw new Error('Data/home.json must contain a JSON array of homes.');
}

if (!homeData.trim()) {
  fs.writeFileSync(homeDataPath, '[]');
}

export default class Home {
  constructor({ houseName, location, price, rating = '', photoURL = '' }) {
    this.id = crypto.randomUUID();
    this.houseName = houseName.trim();
    this.location = location.trim();
    this.price = Number(price);
    this.rating = rating === '' ? null : Number(rating);
    this.photoURL = photoURL.trim();
  }

  save() {
    const homes = [...registeredHomes, this];
    fs.writeFileSync(homeDataPath, JSON.stringify(homes, null, 2));
    registeredHomes.push(this);
    return this;
  }

  static fetchAll() {
    return registeredHomes;
  }
}
