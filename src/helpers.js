
/* randomElement gets a item randomly */
Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)]
};

export const colors = [
  "#FD7B35",
  "#A7BCC9",
  "#1F201E",
  "#818280"
];