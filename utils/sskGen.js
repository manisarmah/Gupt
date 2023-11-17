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
  // console.log("Shuffles Word", shuffledWord);
  const hashedSW = hashString(shuffledWord);
  const finalSW = shuffle(hashedSW, hashedDomain, secretContext, 42);
  const ssk = hashString(finalSW);
  return ssk;
};
//d9becfca41ed8d07a394cf422e945eb6c0f87dcc5c07d463be47bdd19546bdfd1308b1bb2e1aa77cde9af8237ef835d0d22daea05e21c476bcda81248435278f
