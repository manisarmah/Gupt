import crypto from "crypto";
import fs from "fs/promises";

export const decrypt = async (dataToDecrypt) => {
  const privateKeyPath = "keys/private-key.pem";
  const privateKey = await fs.readFile(privateKeyPath, "utf8");
  const bufferEncryptedData = Buffer.from(dataToDecrypt, "base64");
  const decryptedData = crypto.privateDecrypt(privateKey, bufferEncryptedData);
  return decryptedData.toString("utf-8");
};
