import { NextResponse } from "next/server";
import { VersionService } from "@/lib/services/version.service";

export async function GET() {
  try {
    const versionInfo = await VersionService.checkUpdate();
    return NextResponse.json(versionInfo);
  } catch (error) {
    console.error("Failed to fetch version info:", error);
    return NextResponse.json(
      { error: "Failed to check version" },
      { status: 500 }
    );
  }
}
