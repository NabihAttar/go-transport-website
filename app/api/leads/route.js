import { NextResponse } from "next/server";
import { createLead } from "@/core/repo";

const requiredFields = ["name", "phone", "message"];

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body || requiredFields.some((field) => !body[field])) {
      return NextResponse.json(
        { message: "Name, phone, and message are required" },
        { status: 400 }
      );
    }

    const payload = {
      data: {
        name: body.name,
        phone: body.phone,
        message: body.message,
      },
    };

    const data = await createLead(payload);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to create lead:", error);
    return NextResponse.json(
      { message: "Failed to create lead" },
      { status: 500 }
    );
  }
}


