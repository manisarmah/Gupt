import mongoose from "mongoose";

const friendsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  kutumbId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  sentBy: {
    type: String,
    require: true,
  },
});

const Friends = mongoose.model("Friends", friendsSchema);

export default Friends;
