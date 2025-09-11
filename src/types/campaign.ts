export type CampaignStatus = "active" | "inactive" | "completed";

export type CampaignCategory =
  | "Education"
  | "Healthcare"
  | "Environment"
  | "Technology"
  | "Emergency"
  | "Community"
  | "Research"
  | "Infrastructure"
  | "Sports"
  | "Scholarship"
  | "Other";

export interface Campaign {
  id: string;
  name: string;
  description: string;
  goalAmount: number;
  collectedAmount: number;
  donorsCount: number;
  category: CampaignCategory;
  logo: string;
  status: CampaignStatus;
  endDate: string; // ISO date string
  createdBy: string; // who created it
  isActive: boolean; // to soft delete
}
