import crypto from "crypto";

function hashString(inputString) {
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  return hash.digest("hex");
}
export default hashString;
