import { NextResponse } from "next/server";

const DEFAULT_CMS_BASE_URL = "http://95.217.183.52:1337";

const CMS_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_URL ||
  process.env.CMS_BASE_URL ||
  DEFAULT_CMS_BASE_URL;

const isAbsoluteUrl = (value = "") => /^https?:\/\//i.test(value);

const normalizePath = (path = "") => {
  if (!path) {
    return "";
  }

  if (isAbsoluteUrl(path)) {
    return path;
  }

  return path.startsWith("/") ? path : `/${path}`;
};

const buildImageUrl = (path = "") => {
  if (!path) {
    return null;
  }

  if (isAbsoluteUrl(path)) {
    return path;
  }

  return `${CMS_BASE_URL}${normalizePath(path)}`;
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedPaths = searchParams
      .getAll("path")
      .map((path) => path?.trim())
      .filter(Boolean);

    if (requestedPaths.length === 0) {
      return NextResponse.json({
        baseUrl: CMS_BASE_URL,
        url: null,
      });
    }

    if (requestedPaths.length === 1) {
      const path = requestedPaths[0];
      return NextResponse.json({
        baseUrl: CMS_BASE_URL,
        path,
        url: buildImageUrl(path),
      });
    }

    return NextResponse.json({
      baseUrl: CMS_BASE_URL,
      paths: requestedPaths,
      urls: requestedPaths.map(buildImageUrl),
    });
  } catch (error) {
    console.error("Failed to build image URLs:", error);
    return NextResponse.json(
      { message: "Failed to build image URLs" },
      { status: 500 }
    );
  }
}

