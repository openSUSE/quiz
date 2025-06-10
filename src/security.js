function generateMemorablePassword() {
  const adjectives = [
    "Happy", "Smiling", "Bouncy", "Running", "Dusty", "Sneaky",
    "Sleepy", "Zany", "Jumpy", "Witty", "Grumpy", "Geeky", "Friendly",
  ];

  const animals = [
    "Cat", "Dog", "Racoon", "Gorilla", "Chicken", "Horse",
    "Llama", "Otter", "Penguin", "Fox", "Chameleon", "Coon",
  ];

  const randomFrom = arr => arr[Math.floor(Math.random() * arr.length)];

  const adjective = randomFrom(adjectives);
  const animal1 = randomFrom(animals);
  let animal2;
  do {
    animal2 = randomFrom(animals);
  } while (animal1 === animal2); // avoid duplicate animals

  return `${adjective}${animal1}${animal2}`;
}

module.exports = {
  generateMemorablePassword,
};