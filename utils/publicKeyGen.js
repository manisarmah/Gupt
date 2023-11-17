import crypto from "crypto";
import { privateKeyGen } from "./privateKeyGen.js";
export const publicKeyGen = (domain, password) => {
  const privateKeyPem = privateKeyGen(domain, password);
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  const publicKey = privateKey.publicKey.export({
    type: "spki",
    format: "pem",
  });
  return publicKey;
};
