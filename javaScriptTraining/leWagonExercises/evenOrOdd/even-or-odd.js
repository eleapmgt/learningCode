// Consigne : Code la fonction evenOrOdd qui prend un paramètre number (de type number) et retourne une string : "even" si le numéro est pair, "odd" si le numéro est impair.

const evenOrOdd = number => {
  if (number % 2 === 0) {
    return "even"
  } else {
    return "odd"
  };
};
