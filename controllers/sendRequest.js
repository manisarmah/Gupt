import SKS from "../model/sks.js";
import { encSkkGen } from "../utils/encSkkGen.js";
import { sskGen } from "../utils/sskGen.js";

export const sendRequest = async (req, res) => {
  const { userId, kutumbId, domain, password } = req.body;
  try {
    const skkA2B = await sskGen(password, kutumbId, domain);
    const cipherTextA2B = await encSkkGen(skkA2B);
    const cipherTextA2BText = cipherTextA2B.toString("base64");
    const newSKSEntity = new SKS({
      userId: kutumbId,
      intermediateCipherText: cipherTextA2BText,
    });
    await newSKSEntity.save();
    res.status(201).send({ message: "Kutumb request sent!" });
  } catch (e) {
    console.log(e);
    res.status(501).json({ e });
  }
};
