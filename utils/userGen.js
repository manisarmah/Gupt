import dotenv from "dotenv";
import { shuffle } from "./shuffle.js";
import hashString from "./hash.js";
import argon2 from "argon2";
dotenv.config();
export const userGen = async (userId, password, secretCode, domain) => {
  const shuffledWord1 = shuffle(userId.concat(domain), password, secretCode, 42);
  const shuffledWord2 = shuffle(userId.concat(domain), secretCode, password, 42);
  const shuffledWord3 = shuffle(userId.concat(password), domain.concat(secretCode), password.concat(secretCode), 42);
  const hashedSW1 = hashString(shuffledWord1);
  const hashedSW2 = hashString(shuffledWord2);
  const hashedSW3 = hashString(shuffledWord3);
  const secretContext = process.env.SECRET_CONTEXT;
  const shuffledHashedSW1 = shuffle(hashedSW1, hashedSW3, secretContext, 42);
  const shuffledHashedSW2 = shuffle(hashedSW2, hashedSW3, secretContext, 42); 
  const finalSW1 = await argon2.hash(shuffledHashedSW1);
  const finalSW2 = await argon2.hash(shuffledHashedSW2);
  return [finalSW1, finalSW2,shuffledHashedSW1,shuffledHashedSW2];
};
