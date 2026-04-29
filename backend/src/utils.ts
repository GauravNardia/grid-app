const colors = [
  "#22c55e", // green
  "#3b82f6", // blue
  "#f97316", // orange
  "#eab308", // yellow
  "#a855f7", // purple
];

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
}
