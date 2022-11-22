// Takes in a full wallet address and returns the first part ... then last part

export default function truncateAddress(address: string) {
  if (!address) {
    return "";
  }
  const parts = address.split("");
  const firstPart = parts.slice(0, 6);
  const lastPart = parts.slice(-4);
  return `${firstPart.join("")}...${lastPart.join("")}`;
}
