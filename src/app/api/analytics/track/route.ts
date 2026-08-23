import { NextResponse } from "next/server";
import { recordAnalyticsHit, getAnalyticsData } from "@/services/analyticsService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, referrer } = body || {};

    if (path) {
      await recordAnalyticsHit(path, referrer);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "30d"; // '7d' | '30d' | '60d'
    const data = await getAnalyticsData(period);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
