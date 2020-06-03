export const useShuffledData = () => {
  const data = [
    { id: 1, color: "#afafaf", isFlip: false, isMatch: false },
    { id: 1, color: "#afafaf", isFlip: false, isMatch: false },
    { id: 2, color: "#90ffc7", isFlip: false, isMatch: false },
    { id: 2, color: "#90ffc7", isFlip: false, isMatch: false },
    { id: 3, color: "#bece37", isFlip: false, isMatch: false },
    { id: 3, color: "#bece37", isFlip: false, isMatch: false },
    { id: 4, color: "#37ce3c", isFlip: false, isMatch: false },
    { id: 4, color: "#37ce3c", isFlip: false, isMatch: false },
    { id: 5, color: "#37cec7", isFlip: false, isMatch: false },
    { id: 5, color: "#37cec7", isFlip: false, isMatch: false },
    { id: 6, color: "#5537ce", isFlip: false, isMatch: false },
    { id: 6, color: "#5537ce", isFlip: false, isMatch: false },
    { id: 7, color: "#ce37b4", isFlip: false, isMatch: false },
    { id: 7, color: "#ce37b4", isFlip: false, isMatch: false },
    { id: 8, color: "#ce3737", isFlip: false, isMatch: false },
    { id: 8, color: "#ce3737", isFlip: false, isMatch: false },
  ];

  let currentIndex = data.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = data[currentIndex];
    data[currentIndex] = data[randomIndex];
    data[randomIndex] = temporaryValue;
  }
  return data;
};
