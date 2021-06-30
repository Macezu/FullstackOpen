const Formatter = (number) => {
  let final = Array.from(String(number));
  if (final.length > 5) {
    final.splice(3, 0, ".");
  } else if (final.length > 4) {
    final.splice(2, 0, ".");
  } else {
    final.splice(1, 0, ".");
  }
  final = final.slice(0, final.length - 2);
  final.push("k");
  return final.join("");
};

export default Formatter