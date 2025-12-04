import { NextResponse } from "next/server";
import { getHomepage } from "@/core/repo";

export async function GET() {
  try {
    const data = await getHomepage();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
    return NextResponse.json(
      { message: "Failed to load homepage data" },
      { status: 500 }
    );
  }
}

