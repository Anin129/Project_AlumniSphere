export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  date: string; // ISO string
  campaignId?: string; // optional (null means general fund)
}
