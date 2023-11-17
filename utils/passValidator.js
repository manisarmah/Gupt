const passValidator = async (user, password, domain) => {
  const hashedPass = await bcrypt.hash(password, 10);
  
  const hashedUser = await bcrypt.hash(user, 10);

  const hashedDomain = await bcrypt.hash(domain, 10);

  const secretContext = process.env.SECRET_CONTEXT;
  const shuffledWord = shuffle(hashedPass, hashedUser, secretContext, 42);

  const hashedSW = await bcrypt.hash(shuffledWord, 10);
  const finalSW = shuffle(hashedSW, hashedDomain, secretContext, 42);
  const ssk = await bcrypt.hash(finalSW, 10);
  return ssk;
};
