import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-NA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("en-NA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const COMPANY = {
  name: "Omuringa Investment CC",
  academy: "Omuringa Security Training Academy",
  director: "Mr Uepesuvera Tjiharuka",
  phone: "+264 81 728 6079",
  phoneRaw: "+26481728 6079",
  whatsapp: "https://wa.me/264817286079",
  email: "uepesuverat@gmail.com",
  location: "Tseigratse, Keetmanshoop, Namibia",
  trainingLocation: "Keetmanshoop, Namibia",
  tagline: "Professional Security and Business Solutions in Namibia",
  description:
    "Omuringa Investment CC is a growing and reliable Namibian company committed to providing professional security services, business support, and quality security training.",
};
