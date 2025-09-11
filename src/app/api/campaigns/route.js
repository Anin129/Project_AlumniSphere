import { NextResponse } from "next/server";
import demoCampaigns from "../../../data/campaignData.json";

// GET /api/campaigns
export async function GET() {
  return NextResponse.json(demoCampaigns);
}
