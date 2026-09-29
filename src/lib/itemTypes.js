import {
  Smartphone,
  Headphones,
  BatteryCharging,
  Briefcase,
  Camera,
  KeyRound,
  Laptop,
  Wallet,
  Watch,
  Package,
} from "lucide-react";

export const ITEM_TYPES = [
  { value: "", label: "Not specified", icon: Package },
  { value: "phone", label: "Phone", icon: Smartphone },
  { value: "earbuds", label: "Earbuds / AirPods", icon: Headphones },
  { value: "powerbank", label: "Power Bank", icon: BatteryCharging },
  { value: "bag", label: "Bag", icon: Briefcase },
  { value: "camera", label: "Camera / Lens", icon: Camera },
  { value: "keys", label: "Keys", icon: KeyRound },
  { value: "laptop", label: "Laptop", icon: Laptop },
  { value: "wallet", label: "Wallet", icon: Wallet },
  { value: "watch", label: "Watch", icon: Watch },
  { value: "other", label: "Other", icon: Package },
];

export function itemTypeIcon(value) {
  return ITEM_TYPES.find((t) => t.value === value)?.icon || Package;
}

export function itemTypeLabel(value) {
  if (!value) return "Item";
  return ITEM_TYPES.find((t) => t.value === value)?.label || "Item";
}

export const STATUS_META = {
  active: { label: "Active", bg: "var(--color-paper-200)", fg: "var(--color-slate-800)" },
  lost: { label: "Reported lost", bg: "var(--color-lost-100)", fg: "var(--color-lost-500)" },
  recovered: { label: "Recovered", bg: "var(--color-recovered-100)", fg: "var(--color-recovered-500)" },
};
