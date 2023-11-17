import SKS from "../model/sks.js";

export const rejectReq = async (req, res) => {
  try {
    const { userId, kutumbId } = req.body;
    const user = await SKS.findOne({ userId });
    console.log(user);
    const success = user.kutumbToSK.delete(kutumbId);
    console.log(success);
    await user.save();
    res.status(201).send({
      message: `User ${userId} deleted ${kutumbId} request`,
      user: user,
    });
  } catch (e) {
    console.log(e);
  }
};
