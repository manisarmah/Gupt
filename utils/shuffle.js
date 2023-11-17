import { murmur2 } from "murmurhash-js";

function getSeedValue(key,seed, t) {
  for (let i = 0; i < t; i++) {
    seed = murmur2(key, seed);
  }
  return seed;
}

export const shuffle = (str1, str2, ctx, seed) => {
  let mix = "";
  let k,
    t = 16,
    d = 1783;

  let l1 = str1.length;
  let l2 = str2.length;
  let l3 = ctx.length;
  let s1 = str1;
  let s2 = str2;
  let s3 = ctx;
  let ll1 = l1;
  let ll2 = l2;
  let ll3 = l3;
  

  seed = getSeedValue(ctx, seed, t);
  t = (seed % d) + 16;
  seed = getSeedValue(str1, seed, t);
  t = (seed % d) + 16;
  seed = getSeedValue(str2, seed, t);
  t = (seed % d) + 16;

  while (ll1 !== 0 && ll2 !== 0) {
    if ((seed & 1) === 0) {
      seed = getSeedValue(str2, seed, t);
      t = (seed % d) + 16;
      seed = getSeedValue(str1, seed, t);
      t = (seed % d) + 16;
      seed = getSeedValue(ctx, seed, t);
      t = (seed % d) + 16;
      k = seed % ll1;
      mix += s1[k];
      s1 = s1.slice(0, k) + s1.slice(k + 1);
      ll1--;
    } else {
      seed = getSeedValue(str2, seed, t);
      t = (seed % d) + 16;
      seed = getSeedValue(str1, seed, t);
      t = (seed % d) + 16;
      seed = getSeedValue(ctx, seed, t);
      t = (seed % d) + 16;
      k = seed % ll2;
      mix += s2[k];
      s2 = s2.slice(0, k) + s2.slice(k + 1);
      ll2--;
    }
  }

  for (k = 0; k < ll1; k++) {
    seed = getSeedValue(str2, seed, t);
    t = (seed % d) + 16;
    seed = getSeedValue(str1, seed, t);
    t = (seed % d) + 16;
    seed = getSeedValue(ctx, seed, t);
    t = (seed % d) + 16;
    const pos = seed % mix.length;
    mix = mix.substring(0, pos) + s1[k] + mix.substring(pos);
  }

  for (k = 0; k < ll2; k++) {
    seed = getSeedValue(str2, seed, t);
    t = (seed % d) + 16;
    seed = getSeedValue(str1, seed, t);
    t = (seed % d) + 16;
    seed = getSeedValue(ctx, seed, t);
    t = (seed % d) + 16;
    const pos = seed % mix.length;
    mix = mix.substring(0, pos) + s2[k] + mix.substring(pos);
  }

  return mix;
};
