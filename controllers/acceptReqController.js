import SKS from "../model/sks.js";
import { decrypt } from "../utils/decSkkGen.js";
import { sskGen } from "../utils/sskGen.js";
import { xorDecrypt, xorEncrypt } from "../utils/xorEncrypt.js";

export const acceptReq = async (req, res) => {
  try {
    const { userId, kutumbId, domain, password } = req.body;
    const user = await SKS.findOne({ userId });
    const cipherTextA2B = user.intermediateCipherText;
    const skkA2B = await decrypt(cipherTextA2B);
    const skkB2A = await sskGen(password, kutumbId, domain);
    const cipherTextB2AText = xorEncrypt(
      skkA2B.toString("base64"),
      skkB2A.toString("base64")
    );
    const newSKSEntity = new SKS({
      userId: kutumbId,
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
    res.status(200).send("OK");
  } catch (e) {
    console.log(e);
  }
};

export const finaliseReq = async (req, res) => {
  try {
    const { userId, kutumbId, domain, password } = req.body;
    const user = await SKS.findOne({ userId });
    const cipherTextB2A = user.intermediateCipherText;
    const skkA2B = await sskGen(password, kutumbId, domain);
    const skkB2A = xorDecrypt(cipherTextB2A, skkA2B);
    const sskA = await sskGen(password, userId, domain);
    const cipherTextA = xorEncrypt(
      skkB2A.toString("base64"),
      sskA.toString("base64")
    );
    await SKS.updateOne({ userId: userId }, { cipherText: cipherTextA });
    await SKS.updateOne(
      { userId: userId },
      { $unset: { intermediateCipherText: 1 } }
    );
    res.status(200).send("Successful kutumb relationship!");
  } catch (e) {
    res.status(500).send({ error: e });
  }
};
