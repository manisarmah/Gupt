import DS from "../model/ds.js";
import SKS from "../model/sks.js";
import { sskGen } from "../utils/sskGen.js";
import { xorDecrypt, xorEncrypt } from "../utils/xorEncrypt.js";

export const sendMessage = async (req, res) => {
  try {
    const { userId, kutumbId, password, domain, message } = req.body;
    const user = await SKS.findOne({ userId });
    const cipherTextA = user.cipherText;
    const sskA = await sskGen(password, userId, domain);
    const skkB2A = cipherTextA.replace(sskA, "");
    const encryptedMessage = xorEncrypt(message, skkB2A);
    const newDSEntity = new DS({
      userId: kutumbId,
      message: { sender: userId, data: encryptedMessage },
    });
    console.log(newDSEntity);
    await newDSEntity.save();
    res.status(201).send({ message: "Message is successfully encrypted" });
  } catch (e) {
    res.status(500).json({ e });
  }
};

export const receiveMessage = async (req, res) => {
  try {
    const { userId, password, domain } = req.body;
    const user = await DS.findOne({ userId });
    const encryptedMessage = user.message.data;
    const kutumb = user.message.sender;
    const skkB2A = await sskGen(password, kutumb, domain);
    const decryptedMessage = xorDecrypt(encryptedMessage, skkB2A);
    res.status(201).send({ message: decryptedMessage });
  } catch (e) {
    res.status(500).json({ e });
  }
};
