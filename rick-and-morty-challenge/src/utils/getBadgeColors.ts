export const getBadgeColor = (status: string): string => {
  if (status.includes("Alive")) return "green-7";
  if (status.includes("unknown")) return "grey-9";
  else return "red-9";
};
