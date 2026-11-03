export type UserRole = "client" | "barber" | "admin";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  photoUrl?: string;
  language: "fr" | "en" | "ar";
  notificationsEnabled: boolean;
  memberSince: string;
  totalBookings: number;
  upcomingBookings: number;
}
