export const BASE_URL = "http://localhost:3000";

export function getCurrentMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function getTodayName(names) {
  const startDate = new Date("2025-07-06"); // 🎯 use a consistent start date
  //   const today = new Date("2025-07-14"); // 🎯 use a consistent start date
  const today = new Date();

  // Zero out time components to compare only date (not hours/mins)
  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffInTime = today.getTime() - startDate.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  // Prevent negative index if today < startDate
  const index = ((diffInDays % names.length) + names.length) % names.length;

  return names[index];
}

export const names = [
  "Sumanth",
  "Sai Venkata",
  "Sudarshan",
  "MalliKarjuna",
  "Bipin K",
  "RamaKrishna",
  "Ashok",
  "Yashwanth",
];

export const todayName = getTodayName(names);
