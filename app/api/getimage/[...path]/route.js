import { NextResponse } from "next/server";

const DEFAULT_CMS_BASE_URL = "http://95.217.183.52:1337";

const CMS_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_URL ||
  process.env.CMS_BASE_URL ||
  DEFAULT_CMS_BASE_URL;

export async function GET(request, { params }) {
  try {
    const { path } = params;
    
    if (!path || path.length === 0) {
      return NextResponse.json(
        { message: "Image path is required" },
        { status: 400 }
      );
    }

    // Reconstruct the full path from the array
    const imagePath = Array.isArray(path) ? path.join("/") : path;
    const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    const imageUrl = `${CMS_BASE_URL}${normalizedPath}`;

    // Fetch the image from CMS
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Image not found" },
        { status: response.status }
      );
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Failed to fetch image:", error);
    return NextResponse.json(
      { message: "Failed to fetch image" },
      { status: 500 }
    );
  }
}

