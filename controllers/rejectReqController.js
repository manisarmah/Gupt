import SKS from "../model/sks.js";

export const rejectReq = async (req, res) => {
  try {
    const { userId, kutumbId } = req.body;
    const deletedUser = await SKS.findOneAndDelete({ userId });

    if (deletedUser) {
      res.status(201).send({
        message: `User ${userId} deleted ${kutumbId} request`,
        user: deletedUser,
      });
    } else {
      res.status(404).send({
        message: `User ${userId} not found`,
      });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
    console.error(e);
  }
};
