"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneModel = void 0;
exports.connectMongo = connectMongo;
exports.addMone = addMone;
exports.updateMone = updateMone;
exports.getMoneByIdOrNumber = getMoneByIdOrNumber;
exports.getAllMonim = getAllMonim;
// models/Mone.ts
const mongoose_1 = __importDefault(require("mongoose"));
const MoneSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    name: { type: String },
    address: { type: String },
    city: { type: String },
    street: { type: String },
    streetNumber: { type: String },
    house: { type: String },
    floor: { type: String },
    entry: { type: String },
    phone1: { type: String },
    phone2: { type: String },
    read: { type: Boolean },
    gashash: { type: String },
    type: { type: String, enum: ["--", "בניין", "פרטי", "רחוב", ""], default: "" },
    unRead: { type: String },
    location: { type: String },
    message: { type: String },
    images: { type: Array },
    GPS: { type: Array },
    date: { type: String }
});
exports.MoneModel = mongoose_1.default.model('Mone4', MoneSchema);
async function connectMongo() {
    try {
        await mongoose_1.default.connect('mongodb://localhost:27017/db'); // שנה לפי הצורך
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.error("MongoDB connection error", err);
    }
}
async function addMone(mone) {
    const newMone = new exports.MoneModel(mone);
    return await newMone.save();
}
async function updateMone(id, updatedFields) {
    return await exports.MoneModel.findOneAndUpdate({ id }, updatedFields, { new: true });
}
async function getMoneByIdOrNumber(value) {
    return await exports.MoneModel.findOne({ $or: [{ id: value }, { number: value }] });
}
async function getAllMonim() {
    return await exports.MoneModel.find();
}
