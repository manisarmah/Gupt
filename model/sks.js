import mongoose from "mongoose";

const sksSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  intermediateCipherText: {
    type: String,
  },
  cipherText: {
    type: String,
  },
});

const SKS = mongoose.model("SKS", sksSchema);

export default SKS;
