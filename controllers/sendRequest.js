import Friends from "../model/friends.js";
import SKS from "../model/sks.js";
import { encSkkGen } from "../utils/encSkkGen.js";
import { sskGen } from "../utils/sskGen.js";

export const sendRequest = async (req, res) => {
  // console.log(req.body);
  const { userId, kutumbId, domain, password } = req.body;
  try {
    // console.log(kutumbId, password, domain);
    const skkA2B = await sskGen(password, kutumbId, domain);
    const cipherTextA2B = await encSkkGen(skkA2B);
    const cipherTextA2BText = cipherTextA2B.toString("base64");
    const newSKSEntity = new SKS({
      userId: kutumbId,
      kutumbId: userId,
      intermediateCipherText: cipherTextA2BText,
    });
    await newSKSEntity.save();
    const FriendsEntity1 = new Friends({
      userId: userId,
      kutumbId: kutumbId,
      status: "Pending",
      sentBy: userId,
    });
    await FriendsEntity1.save();
    const FriendsEntity2 = new Friends({
      userId: kutumbId,
      kutumbId: userId,
      status: "Pending",
      sentBy: userId,
    });
    await FriendsEntity2.save();
    res
      .status(201)
      .send({ status: "Success", message: "Kutumb request sent!" });
  } catch (e) {
    console.log(e);
    res.status(501).json({ status: "Fail", message: e });
  }
};
