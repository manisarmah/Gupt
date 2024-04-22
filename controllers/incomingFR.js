import Friends from "../model/friends.js";
export const incomingFR = async (req, res) => {
  try {
    const { id } = req.params;
    const friends = await Friends.find({
      kutumbId: id,
      status: "Pending",
    });
    let Kutumbs = [];
    friends.forEach((element) => {
      Kutumbs.push(element.userId);
    });
    res.status(200).json({ incomingKutumbs: Kutumbs });
  } catch (error) {
    console.error("Error retrieving kutumbs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
