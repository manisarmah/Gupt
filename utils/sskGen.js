import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { shuffle } from "./shuffle.js";
import hashString from "./hash.js";
dotenv.config();
export const sskGen = async (password, user, domain) => {
  const hashedPass = hashString(password);
  const hashedUser = hashString(user);
  const hashedDomain = hashString(domain);
  const secretContext = process.env.SECRET_CONTEXT;
  const shuffledWord = shuffle(hashedPass, hashedUser, secretContext, 42);
  const hashedSW = hashString(shuffledWord);
  const finalSW = shuffle(hashedSW, hashedDomain, secretContext, 42);
  const ssk = hashString(finalSW);
  return ssk;
};
