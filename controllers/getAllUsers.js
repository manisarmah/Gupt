import User from "../model/user.js";

const getAllLoggedInUserIds = async (req, res) => {
  try {
    const loggedInUserIds = await User.distinct("userId");

    if (!loggedInUserIds)
      return res.status(404).json({ noOfUsers: 0, message: "No users yet!" });
    res
      .status(200)
      .json({ noOfUsers: loggedInUserIds.length, allUsers: loggedInUserIds });
  } catch (error) {
    console.error("Error fetching logged-in user ids:", error);

    res.status(500).json({ noOfUsers: 0, message: error });
  }
};

export default getAllLoggedInUserIds;
