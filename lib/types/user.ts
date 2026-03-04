export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
  role: "USER" | "ADMIN";
  referralCode?: string;
  referralCreditsGhs: number;
  createdAt: string;
}
