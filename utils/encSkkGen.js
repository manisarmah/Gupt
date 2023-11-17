import crypto from "crypto";
import fs from "fs/promises";

export const encSkkGen = async (dataToEncrypt) => {
  const publicKeyPath = "keys/public-key.pem";
  const publicKey = await fs.readFile(publicKeyPath, "utf8");
  const bufferData = Buffer.from(dataToEncrypt, "utf-8");
  const encryptedData = crypto.publicEncrypt(publicKey, bufferData);
  return encryptedData.toString("base64");
};
