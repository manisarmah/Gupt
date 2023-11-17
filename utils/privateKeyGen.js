import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { shuffle } from "./shuffle.js";
dotenv.config();
export const privateKeyGen = async (domain, password) => {
  const hashedPass = await bcrypt.hash(password, 10);
  const hashedDomain = await bcrypt.hash(domain, 10);
  const secretContext = process.env.SECRET_CONTEXT;
  const shuffledWord = shuffle(hashedPass, hashedDomain, secretContext, 42);
  const hashedSW = await bcrypt.hash(shuffledWord, 10);
  return hashedSW;
};
