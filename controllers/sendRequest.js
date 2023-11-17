import SKS from "../model/sks.js";
import { encSkkGen } from "../utils/encSkkGen.js";
import { sskGen } from "../utils/sskGen.js";

export const sendRequest = async (req, res) => {
  const { userId, kutumbId, domain, password } = req.body;
  try {
    const skkA2B = await sskGen(password, kutumbId, domain);
    console.log("SKKa2b: ", skkA2B);
    const cipherTextA2B = await encSkkGen(skkA2B);
    const cipherTextA2BText = cipherTextA2B.toString("base64");
    console.log("encrypted SKKa2b:", cipherTextA2BText);
    const newSKSEntity = new SKS({
      userId: kutumbId,
      intermediateCipherText: cipherTextA2BText,
    });
    await newSKSEntity.save();
    res.status(201).send(cipherTextA2B.toString("base64"));
  } catch (e) {
    console.log(e);
    res.status(501).json({ e });
  }
};
//$2b$10$Rg7QtMP0BSGji8YpoduCZuDhplZsCy4ccy9ktzHkyOLM0zup2igmu
