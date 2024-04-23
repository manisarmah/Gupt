import SKS from "../model/sks.js";
import { decrypt } from "../utils/decSkkGen.js";
import { sskGen } from "../utils/sskGen.js";
import { xorDecrypt, xorEncrypt } from "../utils/xorEncrypt.js";
import Friends from "../model/friends.js";
export const acceptReq = async (req, res) => {
  try {
    const { userId, kutumbId, domain, password } = req.body;
    const user = await SKS.findOne({ userId: userId, kutumbId: kutumbId });
    if (!user) {
      return res.status(404).json({ status: "Fail", message: "No such user!" });
    }
    const cipherTextA2B = user.intermediateCipherText;
    const skkA2B = await decrypt(cipherTextA2B);
    const skkB2A = await sskGen(password, kutumbId, domain);
    const cipherTextB2AText = xorEncrypt(
      skkA2B.toString("base64"),
      skkB2A.toString("base64")
    );
    const newSKSEntity = new SKS({
      userId: kutumbId,
      kutumbId: userId,
      intermediateCipherText: cipherTextB2AText,
    });
    await newSKSEntity.save();

    const sskB = await sskGen(password, userId, domain);
    const cipherTextB = xorEncrypt(
      skkA2B.toString("base64"),
      sskB.toString("base64")
    );
    await SKS.updateOne({ userId: userId }, { cipherText: cipherTextB });
    await SKS.updateOne(
      { userId: userId },
      { $unset: { intermediateCipherText: 1 } }
    );
    await Friends.updateOne(
      { $and: [{ userId: kutumbId }, { kutumbId: userId }] },
      { $set: { status: "Accepted" } }
    );
    await Friends.updateOne(
      { $and: [{ userId: userId }, { kutumbId: kutumbId }] },
      { $set: { status: "Accepted" } }
    );
    res.status(200).json({ status: "Success" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "Fail", message: e });
  }
};

export const finaliseReq = async (req, res) => {
  try {
    const { userId, kutumbId, domain, password } = req.body;
    console.log(userId, kutumbId, domain, password);
    const user = await SKS.findOne({ userId, kutumbId });
    const cipherTextB2A = user.intermediateCipherText;
    const skkA2B = await sskGen(password, kutumbId, domain);
    console.log(skkA2B);
    const skkB2A = xorDecrypt(cipherTextB2A, skkA2B);
    const sskA = await sskGen(password, userId, domain);
    const cipherTextA = xorEncrypt(
      skkB2A.toString("base64"),
      sskA.toString("base64")
    );
    await SKS.updateOne(
      { $and: [{ userId: userId }, { kutumbId: kutumbId }] },
      { $set: { cipherText: cipherTextA } }
    );
    await SKS.updateOne(
      { $and: [{ userId: userId }, { kutumbId: kutumbId }] },
      { $unset: { intermediateCipherText: 1 } }
    );
    await Friends.updateOne(
      { $and: [{ userId: userId }, { kutumbId: kutumbId }] },
      { $set: { status: "Finalised" } }
    );
    await Friends.updateOne(
      { $and: [{ userId: kutumbId }, { kutumbId: userId }] },
      { $set: { status: "Finalised" } }
    );
    res
      .status(200)
      .json({ message: "Successful kutumb relationship!", status: "Success" });
  } catch (error) {
    res.status(500).json({ status: "Fail ra", message: error });
    console.log(error);
  }
};
