// models/Mone.ts
import mongoose from 'mongoose';

const MoneSchema = new mongoose.Schema({
  id:           { type: String, required: true, unique: true },
  number:       { type: String, required: true },
  name:         { type: String },
  address:      { type: String },
  city:         { type: String },
  street:       { type: String },
  streetNumber: { type: String },
  house:        { type: String },
  floor:        { type: String },
  entry:        { type: String },
  phone1:       { type: String },
  phone2:       { type: String },
  read:         { type: Boolean },
  gashash:      { type: String },
  type:         { type: String, enum: ["--", "בניין", "פרטי", "רחוב", ""], default: "" },
  unRead:       { type: String },
  location:     { type: String }, 
  message:      { type: String },
  images:       { type: Array },
  GPS:          { type: Array },
  date:         { type: String }
});

export const MoneModel = mongoose.model('Mone4', MoneSchema);
 
 
export async function connectMongo() {
  try {
    await mongoose.connect('mongodb://localhost:27017/db'); // שנה לפי הצורך
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error", err);
  }
}


export async function addMone(mone: any) {
  const newMone = new MoneModel(mone);
  return await newMone.save();
}

export async function updateMone(id: string, updatedFields: Partial<any>) {
  return await MoneModel.findOneAndUpdate({ id }, updatedFields, { new: true });
}

export async function getMoneByIdOrNumber(value: string) {
  return await MoneModel.findOne({ $or: [{ id: value }, { number: value }] });
}



export async function getAllMonim() {
  return await MoneModel.find();
}
