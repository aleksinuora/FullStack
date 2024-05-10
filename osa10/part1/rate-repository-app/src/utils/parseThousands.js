const parseThousands = (value) => {
  if (value > 999) {
    return String((value / 1000).toFixed(1)) + 'k';
  } else {
    return String(value);
  }
};

export default parseThousands;
