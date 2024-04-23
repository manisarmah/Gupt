import Friends from "../model/friends.js";
export const getAllFriends = async (req, res) => {
  try {
    const { userId, status } = req.body;
    const friends = await Friends.find({
      userId: userId,
      status: status,
    });
    let Kutumbs = [];
    friends.forEach((element) => {
      Kutumbs.push(element.kutumbId);
    });
    res.status(200).json({ kutumbs: Kutumbs });
  } catch (error) {
    console.error("Error retrieving kutumbs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getYetToFinaliseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Friends.find({
      userId: id,
      sentBy: id,
      status: "Accepted",
    });
    let kutumbs = [];
    response.forEach((ele) => {
      kutumbs.push(ele.kutumbId);
    });
    res.status(200).json({ kutumbs: kutumbs });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
};
