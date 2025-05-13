export const getBadgeColor = (status: string): string => {
  if (status.includes("Alive")) return "green-7";
  if (status.includes("unknown")) return "grey-9";
  if (status.includes("All Characters")) return "blue-3";
  else return "red-9";
};
